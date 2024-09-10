<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;

final class RegisterUserController extends Controller
{
    public function __invoke(RegisterUserRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = User::create($request->validated());

        return response()->json([
            'user' => $user,
        ]);
    }
}
