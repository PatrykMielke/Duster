<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Visit;
use App\Models\Listing;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class VisitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            Visit::create([
                'user_id' => User::inRandomOrder()->first()->id,
                'listing_id' => 1
            ]);
        }
    }
}
