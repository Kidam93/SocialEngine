<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfilController extends Controller
{
    const MIN_POST = 3;
    const MAX_POST = 1000;

    const FIRSTNAME = 3;
    const LASTNAME = 3;
    const DESCRIBE = 250;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function profilFind(){
        $id = $this->request->session()->get('user')->id;
        $user = DB::table('users')->find($id);
        return response()->json(['user' => $user]);
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
        if(empty(self::isValidPost($post))){
            // msg in bdd with relation
            $user = User::find($id);
            $user->posts()->create([
                'content' => $post
            ]);
            // 
            return response()->json(['user' => $user, 'request' => $post]);
        }else{
            return response()->json(self::isValidPost($post));
        }
    }

    public function findPost(){
        $id = $this->request->session()->get('user')->id;
        $posts = DB::table('posts')->where('user_id', $id)->get();
        return response()->json(['posts' => $posts]);
    }

    public function postDelete($idPost){
        $id = $this->request->session()->get('user')->id;
        $posts = DB::table('posts')->where('user_id', $id)->where('id', $idPost)->delete();
        return response()->json(['suppression..' => $posts]);
    }

    public function profilUpdate(Request $request){
        $id = $this->request->session()->get('user')->id;
        // MANY FORMS
        $firstName = $request->request->get('firstname');
        $lastName = $request->request->get('lastname');
        $describe = $request->request->get('describe');
        $valid = ['jpg', 'jpeg', 'png', 'gif'];
        $fullFileName = $request->file('image')->getClientOriginalName();
        $fileName = pathinfo($fullFileName, PATHINFO_FILENAME);
        $extension = $request->file('image')->getClientOriginalExtension();
        $file = $fileName.'_'.time().'.'.$extension;
        if(in_array($extension, $valid)){
            if(empty($this->isValidUpdate($firstName, $lastName, $describe))){
                DB::table('users')->where('id', $id)
                    ->update(['img' => $file, 'firstname' => $firstName, 'lastname' => $lastName, 'describe' => $describe]);
                $request->file('image')->storeAs('public/pictures', $file);
                $user = DB::table('users')->find($id);
                return response()->json(['user' => $user]);
            }else{
                return response()->json(['error' => $this->isValidUpdate($firstName, $lastName, $describe)]);
            }
        }else{
            return response()->json(['error' => "l'extension n'est pas valide"]);
        }
    }

    private static function isValidPost($post){
        $errors = [];
        if(strlen($post) < self::MIN_POST){
            $errors['error'] = "Votre message est trop court";
        }elseif(strlen($post) > self::MAX_POST){
            $errors['error'] = "Votre message est trop long";
        }
        return $errors;
    }

    private function isValidUpdate($firstName, $lastName, $describe){
        $errors = [];
        if(strlen($firstName) <= self::FIRSTNAME){
            $errors['firstName'] = "Votre prenom est trop court";
        }
        if(strlen($lastName) <= self::LASTNAME){
            $errors['lastName'] = "Votre nom est trop court";
        }
        if(strlen($describe) >= self::DESCRIBE){
            $errors['describe'] = "Votre description est trop longue";
        }
        return $errors;
    }
}