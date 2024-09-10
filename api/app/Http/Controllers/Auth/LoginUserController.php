<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class LoginUserController extends Controller
{
    public function __invoke(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            return response()->json([
                'user' => Auth::user(),
                'token' => Auth::user()->createToken('auth_token')->plainTextToken,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 422);
    }
}
