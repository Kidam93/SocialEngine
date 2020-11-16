<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class BaseController extends Controller
{
    const URL_REDIRECT = "http://127.0.0.1:3000";
    const URL_PROFIL = "http://127.0.0.1:3000/profil";

    const PASSWORD = 8;
    const API = "http://127.0.0.1:3000";

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function create(){
        $session = $this->request->session()->all();
        // $userToken = DB::table('users')->where('id', $userId)->value('token');
        return response()->json(['create' => $session]);
    }

    public function store(Request $request){
        $request = $request->request;
        $email = $request->get('email');
        $password = $request->get('password');
        $emailBDD = DB::table('users')->where('email', $email)->value('email');
        $passwordBDD = DB::table('users')->where('email', $email)->value('password');
        $hash = password_verify($password, $passwordBDD);
        if($email === $email && $hash === true){
            $idBDD = DB::table('users')->where('email', $email)->value('id');
            $user = DB::table('users')->find($idBDD);
            $firstName = DB::table('users')->where('id', $idBDD)->value('firstname');
            // JWT
            $key = "demo";
            $token = [
                'user_id' => $idBDD,
                'firstname' => $firstName,
                'exp' => time() * 60
            ];
            $token = JWT::encode($token, $key);
            // SESSION
            $this->request->session()->put('user', $user);
            $sessionUser = $this->request->session()->get('user');
            return response()->json(['user' => $sessionUser, 'token' => $token]);
        }else{
            return response()->json(['errors' => "l'email ou le mot de passe est incorrecte"]);
        }
    }
}