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

    public function allInvitation(){
        if(!empty($this->request->session()->get('user'))){
            // EXPERIMENTAL
            $id = $this->request->session()->get('user')->id;
            $user = self::isFriend($id);
            $all = self::allInviation($id);
            // 
            return response()->json(['users' => $user, 'all' => $all]);
            // 
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    public function friendAccept($idUser){
        $id = $this->request->session()->get('user')->id;
        self::updateAccept($id, $idUser);
        $user = DB::table('users')->where('id', $idUser)
                ->select('id', 'firstname', 'lastname', 'img', 'describe', 'created_at')->get();
        $verify = self::isFriendVerify($id, $idUser);
        $myInvitation = self::myInvitation($id, $idUser);
        return response()->json(['user' => $user, 'is_friend' => $verify, 'accept' => $myInvitation, 'id' => $id]);
    }

    public function deleteFriend($idUser){
        $id = $this->request->session()->get('user')->id;
        self::deleteAccept($id, $idUser);
        $user = DB::table('users')->where('id', $idUser)
                ->select('id', 'firstname', 'lastname', 'img', 'describe', 'created_at')->get();
        $verify = self::isFriendVerify($id, $idUser);
        $myInvitation = self::myInvitation($id, $idUser);
        return response()->json(['user' => $user, 'is_friend' => $verify, 'accept' => $myInvitation, 'id' => $id]);
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

    private static function updateAccept($id, $idUser){
        return DB::update('update friend set confirmed = ? where user_id = ? and friend_id = ?', 
            [1 , $idUser , $id]);
    }

    private static function deleteAccept($id, $idUser){
        return DB::delete(DB::raw("DELETE 
                FROM friend
                WHERE ((friend.user_id = $id
                AND friend.friend_id = $idUser) 
                OR (friend.user_id = $idUser
                AND friend.friend_id = $id))
                AND friend.confirmed = 1"));
    }

    private static function isFriendVerify($id, $idUser){
        return DB::select(DB::raw("SELECT friend.confirmed
                FROM users 
                JOIN friend ON (users.id = friend.user_id OR users.id = friend.friend_id)
                WHERE ((friend.user_id = $id
                AND friend.friend_id = $idUser) 
                OR (friend.user_id = $idUser
                AND friend.friend_id = $id))
                AND users.id != $id"));
    }

    private static function myInvitation($id, $idUser){
        return DB::select(DB::raw("SELECT friend.friend_id
                FROM users 
                JOIN friend ON (users.id = friend.user_id OR users.id = friend.friend_id)
                WHERE ((friend.user_id = $id
                AND friend.friend_id = $idUser) 
                OR (friend.user_id = $idUser
                AND friend.friend_id = $id))
                AND users.id != $id
                AND friend.confirmed = 0"));
    }

    private static function allInviation($id){
        return DB::select(DB::raw("SELECT *, users.id
            FROM users 
            JOIN friend ON (users.id = friend.user_id OR users.id = friend.friend_id)
            WHERE (friend.user_id = $id
            OR friend.friend_id = $id)
            AND friend.confirmed = 0
            AND users.id != $id
            AND friend.user_id != $id"));
    }
}