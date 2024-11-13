<?php

namespace Database\Seeders;

use App\Models\PaymentMethods;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PaymentMethodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nazwaMetody = [

            'BLIK',
            'Google Pay',
        ];

        foreach ($nazwaMetody as $metoda) {
            PaymentMethods::create(['name' => $metoda]);
        }
    }
}
