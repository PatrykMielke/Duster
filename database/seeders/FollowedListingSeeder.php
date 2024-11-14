<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Listing;
use App\Models\FollowedListing;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FollowedListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listings = Listing::all();
        $users = User::pluck('id')->toArray();

        foreach ($users as $user) {
            $followedListingsCount = rand(3, 9);

            $followedListings = $listings->random($followedListingsCount);

            foreach ($followedListings as $listing) {
                FollowedListing::create([
                    'listing_id' => $listing->id,
                    'user_id' => $user
                ]);
            }
        }
    }
}
