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
        $users = User::whereIn('id', range(1, 100))->pluck('id')->toArray();

        // Get all listing IDs to randomly select from
        $listings = Listing::pluck('id')->toArray();

        foreach ($users as $userId) {
            // Randomly select a set of listing IDs for each user to follow
            $followedListings = collect($listings)
                ->random(rand(1, 80)) // Each user follows 1-30 random listings
                ->unique(); // Ensure no duplicates

            foreach ($followedListings as $listingId) {
                FollowedListing::create([
                    'user_id' => $userId,
                    'listing_id' => $listingId,
                ]);
            }
        }
    }
}
