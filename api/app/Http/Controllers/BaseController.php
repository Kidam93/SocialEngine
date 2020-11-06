<?php

namespace App\Http\Controllers;

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
        // $userId = $this->request->session()->get('user_id');
        // $userToken = DB::table('users')->where('id', $userId)->value('token');
        return response()->json(['create' => null]);
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
            return response()->json(['valid' => $user]);
        }else{
            return response()->json(['errors' => "l'email ou le mot de passe est incorrecte"]);
        }
    }
}