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

    public function search($auth_x, Request $request){
        $verifyAuth = self::verifyAuth($auth_x);
        if($verifyAuth !== false){
            $search = $request->request->get('search');
            $id = explode('&', $auth_x)[1];
            if(!empty($search)){
                $users = DB::table('users')->where('users.id', '!=', $id)
                                        ->where('firstname', 'LIKE', "%{$search}%")
                                        ->orWhere('lastname', 'LIKE', "%{$search}%")->get();                       
                return response()->json(['search' => $users]);
            }else{
                return response()->json(['search' => 'Aucun resultats']);
            }
        }else{
            return response()->json(['error' => 'redirect']);
        }
        return;
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
}
