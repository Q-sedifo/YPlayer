<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) 
    {
        if (Auth::attempt($request->all())) {
            $user = Auth::user();
            $token = $user->createToken('AuthToken');
            $token->token->save();

            $user['access_token'] = $token->accessToken;

            return response()->json($user, 200);
        } 
        
        return response()->json(['error' => 'Неправильний нікнейм або пароль'], 401);
    }

    public function register(RegisterRequest $request)
    {
        $credentials = $request->validated();
        $credentials['password'] = bcrypt($credentials['password']);

        User::create($credentials);
    }

    public function logout()
    {
        if (Auth::check()) Auth::user()->tokens()->delete();
        
        return response()->json(['message' => 'Logged out successfully']);
    }
}

