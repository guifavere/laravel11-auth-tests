<?php

use Illuminate\Support\Facades\Route;

Route::post('login', 'App\Http\Controllers\Auth\LoginMobileUserController');
Route::post('logout', 'App\Http\Controllers\Auth\LogoutMobileUserController')->middleware('auth:sanctum');
