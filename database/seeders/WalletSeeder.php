<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            if (!$user->wallet) {
                Wallet::create([
                    'user_id' => $user->id,
                    'balance' => fake()->randomFloat(2, 0, 2000),
                ]);
            }
        }
    }
}
