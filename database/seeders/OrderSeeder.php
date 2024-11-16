<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
use App\Models\Listing;
use App\Models\PaymentMethods;
use App\Models\DeliveryMethods;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $listings = Listing::where('status_id', 2)->get();

        foreach ($listings as $listing) {
            $date = fake()->dateTimeBetween('-2 years', 'now');
            Order::create([
                'buyer_id' => User::inRandomOrder()->first()->id,

                'listing_id' => $listing->id,
                'delivery_method_id' => DeliveryMethods::inRandomOrder()->first()->id,
                'payment_method_id' => PaymentMethods::inRandomOrder()->first()->id,
                'address' => fake()->streetAddress(),
                'zipcode' => fake()->postcode(),
                'city' => fake()->city(),
                'country' => fake()->country(),
                'apartment' => fake()->optional()->buildingNumber(),
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }

    }
}
