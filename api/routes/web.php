<?php

use Faker\Provider\Base;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FriendController;
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
Route::get('/profil', [ProfilController::class, 'profilFind']);
Route::get('/profil-disconnected', [ProfilController::class, 'disconnectedUser']);
Route::post('/profil', [ProfilController::class, 'profilPosts']);
Route::get('/profil-post', [ProfilController::class, 'findPost']);
// SEARCH
Route::post('/search', [SearchController::class, 'search']);
Route::get('/explore', [SearchController::class, 'all']);
// POST
Route::get('/profil-delete-{id}', [ProfilController::class, 'postDelete']);
Route::post('/profil-update', [ProfilController::class, 'profilUpdate']);
// USER
Route::get('/user-{id}', [UserController::class, 'user']);
Route::post('/user-{id}', [UserController::class, 'userAdd']);
// FRIEND
Route::get('/friend', [FriendController::class, 'all']);
Route::post('/friend-delete-{id}', [FriendController::class, 'deleteFriend']);
Route::post('/friend-{id}', [FriendController::class, 'friendAccept']);
