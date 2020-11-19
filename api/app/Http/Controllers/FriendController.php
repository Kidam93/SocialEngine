<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class FriendController extends Controller
{

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function findFriend(){
        if(!empty($this->request->session()->get('user'))){
            
            return response()->json(['users' => NULL]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }
}
