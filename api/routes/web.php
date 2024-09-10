<?php

use Illuminate\Support\Facades\Route;

Route::post('login', 'App\Http\Controllers\Auth\LoginUserController');
Route::post('register', 'App\Http\Controllers\Auth\RegisterUserController');
