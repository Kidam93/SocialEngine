<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class ProfilController extends Controller
{
    const MIN_POST = 3;
    const MAX_POST = 1000;

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

    public function profil($auth_x){
        $verifyAuth = self::verifyAuth($auth_x);
        if($verifyAuth !== false){
            return response()->json(['user' => $verifyAuth]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    public function profilPosts($auth_x, Request $request){
        // POSTS
        $verifyAuth = self::verifyAuth($auth_x);
        $post = $request->request->get('post');
        if($verifyAuth !== false){
            if(empty(self::isValid($post))){
                // msg in bdd with relation
                $id = explode('&', $auth_x)[1];
                $user = User::find($id);
                $user->posts()->create([
                    'content' => $post
                ]);
                // 
                return response()->json(['user' => $verifyAuth, 'request' => $post]);
            }else{
                return response()->json(self::isValid($post));
            }
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    public function findPost($auth_x){
        $verifyAuth = self::verifyAuth($auth_x);
        if($verifyAuth !== false){
            $id = explode('&', $auth_x)[1];
            $posts = DB::table('posts')->where('user_id', $id)->get();
            return response()->json(['posts' => $posts]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    private static function verifyAuth($auth_x){
        // if verifyAuth is correct return profil
        $auth = explode('&', $auth_x)[0];
        $id = explode('&', $auth_x)[1];
        $idBDD = DB::table('users')->where('auth', $auth)->value('id');
        $authBDD = DB::table('users')->where('id', $idBDD)->value('auth');
        if($auth === $authBDD && (int)$id === (int)$idBDD){
            return DB::table('users')->find($idBDD);
        }else{
            return false;
        }
    }

    private static function isValid($post){
        $errors = [];
        if(strlen($post) < self::MIN_POST){
            $errors['error'] = "Votre message est trop court";
        }elseif(strlen($post) > self::MAX_POST){
            $errors['error'] = "Votre message est trop long";
        }
        return $errors;
    }
}