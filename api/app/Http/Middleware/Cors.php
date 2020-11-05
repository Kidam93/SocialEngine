<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    const URL = "http://localhost:3000";

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        return $next($request)
            ->header('Access-Control-Allow-Origin', self::URL)
            // ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', '*')
            // ->header('Access-Control-Allow-Headers', self::API)
            ->header('Access-Control-Allow-Credentials', 'true');
    }
}
