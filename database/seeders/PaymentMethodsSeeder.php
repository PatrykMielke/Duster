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
            'Przelewy 24',
            'BLIK',
            'Google Pay',
            'Apple Pay',
            'PayPal',
            'Karta VISA',
            'Karta Mastercard',
        ];

        foreach ($nazwaMetody as $metoda) {
            PaymentMethods::create(['name' => $metoda]);
        }
    }
}
