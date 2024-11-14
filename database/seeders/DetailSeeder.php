<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Size;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Detail;
use App\Models\Listing;
use App\Models\Condition;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listings = Listing::all();
        $categories = Category::all();
        $sizes = Size::all();
        $brands = Brand::all();
        $conditions = Condition::all();



        foreach ($listings as $listing) {
            $randomCategory = $categories->random();
            $randomSize = $sizes->random();
            $randomBrand = $brands->random();
            $randomCondition = $conditions->random();

            Detail::create([
                'listing_id' => $listing->id,
                'category_id' => $randomCategory->id,
                'size_id' => $randomSize->id,
                'brand_id' => $randomBrand->id,
                'condition_id' => $randomCondition->id
            ]);
        }
    }
}
