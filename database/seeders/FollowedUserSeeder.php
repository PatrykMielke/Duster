<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\FollowedUser;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FollowedUserSeeder extends Seeder
{
    public function run()
    {
        $users = User::select('id',)->pluck('id')->toArray();

        foreach ($users as $userId) {
            $followedUsers = collect($users)
                ->reject(fn($id) => $id === $userId)
                ->random(rand(1, 5))
                ->unique();

            foreach ($followedUsers as $followedUserId) {
                FollowedUser::create([
                    'user_id' => $userId,
                    'followed_user_id' => $followedUserId,
                ]);
            }
        }
    }
}
