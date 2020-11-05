<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfilController extends Controller
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function findUser(){
        // $userId = $this->request->session()->get('user_id');
        // if(!empty($userId)){
        //     $user = DB::table('users')->find($userId);
        //     return response()->json($user);
        // }else{
        //     return response()->json("noconnected", $userId);
        // }
        // session_start();
        // $_SESSION['id']
        return response()->json(['session' => $_SESSION]);
    }

    public function disconnectedUser(){
        $userId = $this->request->session()->get('user_id');
        if(!empty($userId)){
            $this->request->session()->put('user_id', NULL);
            return response()->json(['errors' => "l'email ou le mot de passe est incorrecte"]);
        }
    }
}