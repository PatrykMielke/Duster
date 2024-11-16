<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\FollowedUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserFollowController extends Controller
{

    public function index($userId)
    {
        $followed_users = FollowedUser::where('user_id', $userId)->with('followed_user_id')->get();

        // odkomentowac gdy bedzie strona
        // return inertia('Profile/FollowedUsers', [
        //     'followed_users' => $followed_users
        // ]);

        return response()->json(['followed_users' => $followed_users],);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'followed_user_id' => 'required|integer|exists:users,id',
                'user_id' => 'required|integer|exists:users,id',
            ]);

            $existingFollow = FollowedUser::where('followed_user_id', $validatedData['followed_user_id'])
                ->where('user_id', $validatedData['user_id'])
                ->first();

            if ($existingFollow || $validatedData['followed_user_id'] == $validatedData['user_id']) {
                return back();
            }

            $newFollow = FollowedUser::create($validatedData);

            return back();
        } catch (\Exception $e) {
            return back();
        }
    }


    public function check(Request $request)
    {
        $validatedData = $request->validate([
            'followed_user_id' => 'required|integer|exists:users,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);
        $exists = FollowedUser::where('user_id', $validatedData['user_id'])
            ->where('followed_user_id', $validatedData['followed_user_id'])
            ->exists();

        return Inertia::render('Profile/Profile', [
            'isFollowing' => $exists,
        ]);
    }



    public function destroy(Request $request)
    {


        $validatedData = $request->validate([
            'followed_user_id' => 'required|integer|exists:users,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        FollowedUser::where('followed_user_id', $validatedData['followed_user_id'])
            ->where('user_id', $validatedData['user_id'])
            ->delete();

        return back();
    }
}
