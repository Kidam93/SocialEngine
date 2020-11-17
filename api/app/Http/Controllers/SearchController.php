<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class SearchController extends Controller
{

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function search(Request $request){
        if(!empty($this->request->session()->get('user'))){
            $search = $request->request->get('search');
            $id = $this->request->session()->get('user')->id;
            if(!empty($search)){
                $users = DB::table('users')->where('users.id', '!=', $id)
                                        ->where('firstname', 'LIKE', "%{$search}%")
                                        ->orWhere('lastname', 'LIKE', "%{$search}%")
                                        ->select('id', 'firstname', 'lastname', 'img')->get();
                return response()->json(['users' => $users]);   
            }
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }

    public function all(){
        $id = $this->request->session()->get('user')->id;
        $all = DB::table('users')->where('users.id', '!=', $id)->select('id', 'firstname', 'lastname', 'img', 'describe', 'created_at')->get();
        return response()->json(['users' => $all]);
    }
}
