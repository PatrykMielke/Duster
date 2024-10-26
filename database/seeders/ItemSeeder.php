<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rodzajeUbran = [
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

        $categories = Category::all();
        $randomCat = $categories->random(1)->pluck('id')->first();

        foreach ($rodzajeUbran as $rodzaj) {
            Item::create(
                [
                    'name' => $rodzaj,
                    'category_id' => $randomCat,
                ]
            );
        }
    }
}
