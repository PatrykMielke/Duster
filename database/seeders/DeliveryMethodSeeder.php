<?php

namespace Database\Seeders;

use App\Models\DeliveryMethods;
use Illuminate\Database\Seeder;

class DeliveryMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $deliveryMethods = [
            ['name' => 'InPost', 'price' => 12.99],
            ['name' => 'Poczta Polska', 'price' => 8.50],
            ['name' => 'DHL', 'price' => 15.00],
            ['name' => 'UPS', 'price' => 18.50],
        ];

        foreach ($deliveryMethods as $deliveryMethod) {
            DeliveryMethods::create($deliveryMethod);
        }
    }
}
