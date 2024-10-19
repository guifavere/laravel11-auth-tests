<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

final class LogoutMobileUserController
{
    public function __invoke(Request $request)
    {
        PersonalAccessToken::findToken($request->bearerToken())->delete();

        return response()->noContent();
    }
}
