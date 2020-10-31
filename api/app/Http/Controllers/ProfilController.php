<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
            return view('profil');
        }elseif($userId === null){
            return redirect()->action('App\Http\Controllers\BaseController@create');
        }
    }

    public function disconnected(){
        if($this->request->request->get('submit') === 'submit'){
            $this->request->session()->put('user_id', null);
            $this->request->session()->flush();
            // dd($this->request->session()->get('user_id'));
        }
    }
}