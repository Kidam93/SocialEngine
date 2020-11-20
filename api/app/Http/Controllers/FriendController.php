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

    public function all(){
        if(!empty($this->request->session()->get('user'))){
            $id = $this->request->session()->get('user')->id;
            $user = self::isFriend($id);
            return response()->json(['users' => $user]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    private static function isFriend($id){
        return DB::select(DB::raw("SELECT *, users.id
                FROM users 
                JOIN friend ON (users.id = friend.user_id OR users.id = friend.friend_id)
                WHERE (friend.user_id = $id
                OR friend.friend_id = $id)
                AND users.id != $id
                AND friend.confirmed = 1"));
    }
}
