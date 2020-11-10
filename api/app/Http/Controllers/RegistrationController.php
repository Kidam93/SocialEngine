<?php

namespace App\Http\Controllers;

use DateTime;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Symfony\Component\HttpFoundation\Request;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class RegistrationController extends Controller
{
    const FIRSTNAME = 3;
    const LASTNAME = 3;
    const PASSWORD = 8;
    // test port 8000
    const URL_CONFIRM = "http://127.0.0.1:3000/confirmed";
    // 
    const URL_REDIRECT = "http://127.0.0.1:3000";
    const URL_PROFIL = "http://127.0.0.1:3000/profil";

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function create(){
        return view('registration');
    }

    public function store(Request $request){
        $request = $request->request;
        $firstName = (string)$request->get('firstName');
        $lastName = (string)$request->get('lastName');
        $email = $request->get('email');
        $password = $request->get('password');
        $passwordConfirmed = $request->get('passwordConfirmed');
        $isValid = $this->isValid($firstName, $lastName, $email, $password, $passwordConfirmed);
        if(empty($isValid)){
            // WRITE SQL INSERT DATA IN USER TABLE 
            $token = self::generateToken(60);
            $auth = self::generateToken(40);
            DB::table('users')->insert(
                ['firstname' => $firstName, 
                'lastname' => $lastName,
                'email' => $email,
                'password' => password_hash($password, PASSWORD_BCRYPT),
                'token' => $token,
                'auth' => $auth,
                'created_at' => new \DateTime(),
                'updated_at' => new \DateTime()]
            );
            // SEND MAIL
            $id = DB::table('users')->where('email', $email)->value('id');
            $this->sendMail($email, $id, $token);
            return response()->json(['auth' => $auth]);
        }else{
            return response()->json($isValid);
        }
    }

    public function confirm($id, $token){
        $idBDD = DB::table('users')->where('id', $id)->value('id');
        $tokenBDD = DB::table('users')->where('id', $id)->value('token');
        if((int)$id === $idBDD && $token === $tokenBDD){
            $this->request->session()->put('user_id', $idBDD);
            DB::table('users')->where('id', $idBDD)->update(['token' => 'ok']);
            $user = DB::table('users')->find($idBDD);
            $firstName = DB::table('users')->where('id', $idBDD)->value('firstname');
            $key = "demo";
            $token = [
                'user_id' => $id,
                'firstname' => $firstName,
                'exp' => time() * 60
            ];
            $token = JWT::encode($token, $key);
            return response()->json(['user' => $user, 'token' => $token]);
        }else{
            return response()->json(['error' => 'badconfirmed']);
        }
    }

    private function emailAlreadyExist($email){
        return DB::table('users')->where('email', $email)->value('email');
    }

    private function isValid($firstName, $lastName, $email, $password, $passwordConfirmed){
        $errors = [];
        if(strlen($firstName) <= self::FIRSTNAME){
            $errors['firstName'] = "Votre prenom est trop court";
        }
        if(strlen($lastName) <= self::LASTNAME){
            $errors['lastName'] = "Votre nom est trop court";
        }
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors['email'] = "Votre email est incorrect";
        }
        if(strlen($password) <= self::PASSWORD){
            $errors['password'] = "Votre mot de passe est trop court";
        }
        if($password !== $passwordConfirmed){
            $errors['passwordConfirmed'] = "Vos mot de passe ne correspondent pas !";
        }
        if($this->emailAlreadyExist($email) !== null){
            $errors['email'] = "Cet email existe deja";
        }
        return $errors;
    }

    public function sendMail($email, $id, $token){
        $to      = $email;
        $subject = 'Confirmation du compte';
        $message = 'Afin de valider votre compte veuillez cliquer sur se lien:'."\r\n"
        .self::URL_CONFIRM.'/'.$id.'-'.$token;
        $headers = 'From: SocialEngine' . "\r\n" .
        'Reply-To: '.$email. "\r\n" .
        'X-Mailer: PHP/' . phpversion();
        return mail($to, $subject, $message, $headers);
    }

    private static function generateToken($length){
        $alphabet = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789";
        $repeat = str_repeat($alphabet, $length);
        $shuffle = str_shuffle($repeat);
        return substr($shuffle, 0, $length);
    }

}
