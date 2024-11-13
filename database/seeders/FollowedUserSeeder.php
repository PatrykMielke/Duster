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
        $users = User::whereIn('id', range(1, 100))->pluck('id')->toArray();

        foreach ($users as $userId) {
            $followedUsers = collect($users)
                ->reject(fn($id) => $id === $userId) // Avoid following oneself
                ->random(rand(1, 30)) // Each user follows 1-5 other random users
                ->unique(); // Ensure no duplicates

            foreach ($followedUsers as $followedUserId) {
                FollowedUser::create([
                    'user_id' => $userId,
                    'followed_user_id' => $followedUserId,
                ]);
            }
        }
    }
}

