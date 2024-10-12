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
            'Karta kredytowa',
            'Karta debetowa',
            'PayPal',
            'Przelew bankowy',
            'BLIK',
            'Apple Pay',
            'Google Pay',
            'Kryptowaluta',
            'Płatność przy odbiorze',
            'Portfel elektroniczny'
        ];

        foreach ($nazwaMetody as $metoda) {
            PaymentMethods::create(['name' => $metoda]);
        }
    }   
}
