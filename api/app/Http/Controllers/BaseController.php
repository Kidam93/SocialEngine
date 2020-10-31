<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class BaseController extends Controller
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function create(){
        return view('home');
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
            $this->request->session()->put('user_id', $idBDD);
            return redirect()->action('App\Http\Controllers\ProfilController@create');
        }
    }
}