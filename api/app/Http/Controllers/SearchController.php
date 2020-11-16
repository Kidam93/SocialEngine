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
                                        ->select('id', 'firstname', 'lastname')->get();
                return response()->json(['users' => $users]);   
            }else{
                $json = json_decode('[{"id":0,"firstname":"Aucuns","lastname":"Resultats"}]');
                return response()->json(['users' => $json]);
            }
        }else{
            return response()->json(['error' => 'redirect']);
        }
    }
}
