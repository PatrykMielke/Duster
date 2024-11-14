<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FollowedUser;
use Illuminate\Http\Request;

class UserFollowController extends Controller
{

    public function index($userId)
    {
        dd($userId);
        $followed_users = FollowedUser::where('user_id', $userId)->with('followed_user_id')->get();
        dd($followed_users);
        return inertia('Profile/FollowedUsers', [
            'followed_users' => $followed_users

        ]);
    }

    public function store(Request $request)
    {
        dd($request);
        try {
            $validatedData = $request->validate([
                'followed_user_id' => 'required|integer|exists:users,id',
                'user_id' => 'required|integer|exists:users,id',
            ]);

            $existingFollow = FollowedUser::where('followed_user_id', $validatedData['followed_user_id'])
                ->where('user_id', $validatedData['user_id'])
                ->first();

            if ($existingFollow) {
                return response()->json(['status' => 'Już obserwujesz tego użytkownika'], 200);
            }

            $newFollow = FollowedUser::create($validatedData);

            return response()->json(['status' => 'Dodano do obserwowanych', 'data' => $newFollow], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Wystąpił błąd podczas zapisu'], 500);
        }
    }


    public function check(Request $request)
    {
        dd($request);

        $exists = FollowedUser::where('user_id', $request->user_id)
            ->where('followed_user_id', $request->followed_user_id)
            ->exists();

        return response()->json(['isFavorite' => $exists]);
    }



    public function destroy(Request $request)
    {
        dd($request);

        $validatedData = $request->validate([
            'followed_user_id' => 'required|integer|exists:users,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        FollowedUser::where('followed_user_id', $validatedData['followed_user_id'])
            ->where('user_id', $validatedData['user_id'])
            ->delete();

        return response()->json(['message' => 'Unfollowed successfully']);
    }
}
