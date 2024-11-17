<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Session; // Use your Session model
use App\Models\User;    // Use the User model
use Illuminate\Support\Str;

class SessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users
        $users = User::all();

        foreach ($users as $user) {
            // Create 1-3 sessions for each user
            Session::create([
                'id' => Str::uuid()->toString(),
                'user_id' => $user->id, // Assign the session to the user
                'ip_address' => fake()->ipv4(),
                'user_agent' => fake()->userAgent(),
                'payload' => base64_encode(json_encode(['key' => Str::random(10)])),
                'last_activity' => now()->subDays(rand(0, 14))->subSeconds(rand(0, 86400))->timestamp
            ]);
        }
    }
}
