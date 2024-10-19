<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class LoginMobileUserController extends Controller
{
    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        return Auth::attempt($credentials)
            ? response()->json(['auth_token' => Auth::user()->createToken('auth_token')->plainTextToken], 200)
            : response()->json(['message' => 'Invalid credentials'], 422);
    }
}
