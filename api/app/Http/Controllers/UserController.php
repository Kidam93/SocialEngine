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
            // IF FRIEND OR NOT ?
            $isFriend = self::isFriend($id);
            if(!empty($isFriend)){
                // IS FRIEND
                return response()->json(['user' => $user, 'is_friend' => true]);
            }else{
                // IS NOT
                return response()->json(['user' => $user, 'is_friend' => false]);
            }
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