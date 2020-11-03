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

    public function create(){
        $userId = $this->request->session()->get('user_id');
        // dd($userId);
        if($userId !== null){
            // return view('profil');
            // $idBDD = DB::table('users')->where('email', $email)->value('id');
            // $this->request->session()->put('user_id', $idBDD);
            // $user = DB::table('users')->find($idBDD);
            // return response()->json($user);

            return response()->json($userId);
        }elseif($userId === null){
            // return redirect()->action('App\Http\Controllers\BaseController@create');
            return response()->json(['error' => 'redirect']);
        } 
    }

    public function disconnected(){
        if($this->request->request->get('submit') === 'submit'){
            $this->request->session()->put('user_id', null);
            $this->request->session()->flush();
            // dd($this->request->session()->get('user_id'));
            return response()->json(['submit' => 'disconnected']);
        }
    }
}