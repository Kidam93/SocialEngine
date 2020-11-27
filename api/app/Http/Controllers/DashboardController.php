<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use App\Events\PostCreatedEvent;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    const MIN_CONTENT = 3;
    const MAX_CONTENT = 150;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function all(){
        if(!empty($this->request->session()->get('user'))){
            // BROADCAST
            // $event = new PostCreatedEvent(['name' => 'titre']);
            // event($event);
            $id = $this->request->session()->get('user')->id;
            $myPost = self::myPost();
            
            return response()->json(['all_posts' => $myPost]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    public function post(){
        if(!empty($this->request->session()->get('user'))){
            $content = $this->request->get('post');
            $id = $this->request->session()->get('user')->id;
            $isValid = $this->isValid($content);
            if(empty($isValid)){
                DB::insert('insert into dashboard (content, user_id, created_at, updated_at) values (?, ?, ?, ?)', 
                [$content, $id, new DateTime(), new DateTime()]);
                return response()->json(['valid' => $content]);
            }else{
                return response()->json(['error' => $isValid]);
            }
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    private function isValid($content){
        $errors = [];
        if(strlen($content) <= self::MIN_CONTENT){
            $errors['content'] = "Votre message est trop court";
        }
        if(strlen($content) >= self::MAX_CONTENT){
            $errors['content'] = "Votre message est trop long";
        }
        return $errors;
    }

    private static function myPost(){
        return DB::select(DB::raw("SELECT *, dashboard.created_at 
                FROM dashboard
                JOIN users ON (dashboard.user_id = users.id)"));
    }
}