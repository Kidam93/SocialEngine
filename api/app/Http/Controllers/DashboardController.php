<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PostCreatedEvent;

class DashboardController extends Controller
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function all(){
        if(!empty($this->request->session()->get('user'))){
            // BROADCAST
            $event = new PostCreatedEvent(['name' => 'titre']);
            event($event);

            return response()->json(['broadcast' => $event]);
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }
}