<?php

namespace App\Http\Controllers;

use DateTime;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function user($idUser){
        if($this->request->session()->get('user')){
            // $id = $this->request->session()->get('user')->id;
            $user = DB::table('users')->where('id', $idUser)
                ->select('id', 'firstname', 'lastname', 'img', 'describe', 'created_at')->get();
            // IF FRIEND OR NOT ?
            $id = $this->request->session()->get('user')->id;
            $isFriend = self::isFriend($id, $idUser);
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

    public function userAdd($idUser){
        if($this->request->session()->get('user')){
            // SET CONFIRMED 0
            $id = $this->request->session()->get('user')->id;
            DB::insert('insert into friend (user_id, friend_id, confirmed, created_at, updated_at) values (?, ?, ?, ?, ?)', 
                [$id, $idUser, 0, new DateTime(), new DateTime()]);
            return response()->json(['user-add-' => $idUser]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    private static function isFriend($id, $idUser){
        return DB::select(DB::raw("SELECT *, users.id
                FROM users 
                JOIN friend ON (users.id = friend.user_id OR users.id = friend.friend_id)
                WHERE ((friend.user_id = $id
                AND friend.friend_id = $idUser) 
                OR (friend.user_id = $idUser
                AND friend.friend_id = $id))
                AND users.id != $id
                AND friend.confirmed = 1"));
    }
}