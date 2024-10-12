<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Color;
use App\Models\PaymentMethods;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    private static $rodzajeUbran = [
        'Koszulka',
        'Spodnie',
        'Kurtka',
        'Bluza',
        'Sukienka',
        'Spódnica',
        'Sweter',
        'Marynarka',
        'Szorty',
        'Garnitur',
        'T-shirt',
        'Jeansy',
        'Kamizelka',
        'Golf',
        'Płaszcz',
        'Kardigan',
        'Trencz',
        'Legginsy',
        'Tunika',
        'Body',
        'Kombinezon',
        'Szlafrok',
        'Piżama',
        'Fartuch',
        'Koszula',
        'Bezrękawnik',
        'Rękawiczki',
        'Kapelusz',
        'Czapka',
        'Chusta',
        'Beret',
        'Pasek',
        'Okulary przeciwsłoneczne',
        'Torebka',
        'Plecak',
        'Portfel',
        'Zegarek',
        'Parasol',
        'Szal',
        'Naszyjnik',
        'Bransoletka',
        'Kolczyki',
        'Pierścionek',
        'Broszka',
        'Łańcuszek',
        'Spinka do włosów',
        'Zegarek na rękę'
    ];

    public function run(): void
    {
        User::factory(20)->create();
        $this->call(ColorSeeder::class);
        $this->call(PaymentMethodsSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(StatusSeeder::class);
    }
}
