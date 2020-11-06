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
        
        return response()->json(['profil' => 'find']);
    }

    public function disconnectedUser(){
        
        return response()->json(['profil' => 'disconnected']);
    }
}