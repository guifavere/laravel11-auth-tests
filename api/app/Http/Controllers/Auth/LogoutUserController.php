<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

final class LogoutUserController
{
    public function __invoke(Request $request): \Illuminate\Http\Response
    {
        PersonalAccessToken::findToken($request->bearerToken())->delete();

        return response()->noContent();
    }
}
