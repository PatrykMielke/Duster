<?php

namespace Database\Seeders;

use App\Models\Gallery;
use App\Models\Listing;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listings = Listing::all();

        foreach ($listings as $listing) {
            for ($i = 0; $i < 5; $i++) {
                $rng = rand(1, 102);
                Gallery::create([
                    'listing_id' => $listing->id,
                    'image' => "/gallery/" . $rng . ".avif"
                ]);
            }
        }
    }
}
