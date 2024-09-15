<?php

use Illuminate\Support\Facades\Route;

Route::post('login', 'App\Http\Controllers\Auth\LoginUserController');
Route::post('logout', 'App\Http\Controllers\Auth\LogoutUserController')->middleware('auth:sanctum');
Route::post('register', 'App\Http\Controllers\Auth\RegisterUserController');
