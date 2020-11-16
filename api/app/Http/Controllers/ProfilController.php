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

    public function profilFind(){
        $sessionUser = $this->request->session()->get('user');
        return response()->json(['user' => $sessionUser]);
    }

    public function disconnectedUser(){
        $this->request->session()->put('user', NULL);
        $sessionUser = $this->request->session()->get('user');
        return response()->json(['user' => $sessionUser]);
    }

    public function profilPosts(Request $request){
        // POSTS
        $post = $request->request->get('post');
        $id = $this->request->session()->get('user')->id;
        $user = DB::table('users')->find($id);
        if(empty(self::isValid($post))){
            // msg in bdd with relation
            $user = User::find($id);
            $user->posts()->create([
                'content' => $post
            ]);
            // 
            return response()->json(['user' => $user, 'request' => $post]);
        }else{
            return response()->json(self::isValid($post));
        }
    }

    public function findPost(){
        $id = $this->request->session()->get('user')->id;
        $posts = DB::table('posts')->where('user_id', $id)->get();
        return response()->json(['posts' => $posts]);
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