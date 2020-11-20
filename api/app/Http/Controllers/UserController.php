<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function user($id){
        if($this->request->session()->get('user')){
            $user = DB::table('users')->where('id', $id)
                ->select('id', 'firstname', 'lastname', 'img', 'describe', 'created_at')->get();
                // if(count($user) !== (int)0){
                //     return response()->json(['user' => $user]);
                // }
                // return response()->json(['user' => NULL]);
                return response()->json(['user' => $user]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    public function userAdd($id){
        if($this->request->session()->get('user')){
            return response()->json(['user-add-' => $id]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }
}