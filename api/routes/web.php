<?php

use Faker\Provider\Base;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\RegistrationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// HOME
Route::get('/', [BaseController::class, 'create']);
Route::post('/', [BaseController::class, 'store']);
Route::get('/registration', [RegistrationController::class, 'create']);
Route::post('/registration', [RegistrationController::class, 'store']);
Route::get('/confirmed/{id}-{token}', [RegistrationController::class, 'confirm']);
// PROFIL
Route::get('/profil', [ProfilController::class, 'findUser']);
Route::get('/profil/{auth_x}', [ProfilController::class, 'profil']);
Route::get('/profil-disconnected', [ProfilController::class, 'disconnectedUser']);
Route::post('/profil/{auth_x}', [ProfilController::class, 'profilPosts']);
Route::get('/profil-post/{auth_x}', [ProfilController::class, 'findPost']);
// SEARCH
Route::post('/search/{auth_x}', [SearchController::class, 'search']);