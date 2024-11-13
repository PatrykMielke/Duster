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
            ['name' => 'InPost Paczkomat', 'price' => 9.99],
            ['name' => 'InPost Kurier', 'price' => 12.99],
            ['name' => 'Poczta Polska ', 'price' => 8.50],
            ['name' => 'Pocztex ', 'price' => 13.50],
            ['name' => 'DHL', 'price' => 15.00],
            ['name' => 'UPS', 'price' => 18.50],
            ['name' => 'DPD', 'price' => 16.99],
        ];

        foreach ($deliveryMethods as $deliveryMethod) {
            DeliveryMethods::create($deliveryMethod);
        }
    }
}
