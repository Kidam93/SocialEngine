<?php

use Faker\Provider\Base;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\ProfilController;
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
// SESSION VERIFICATION USER
Route::get('/profil', [ProfilController::class, 'findUser']);
// PROFIL
Route::get('/profil-disconnected', [ProfilController::class, 'disconnectedUser']);