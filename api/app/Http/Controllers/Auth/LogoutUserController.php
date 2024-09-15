<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

final class LogoutUserController
{
    public function __invoke(Request $request): \Illuminate\Http\Response
    {
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}
