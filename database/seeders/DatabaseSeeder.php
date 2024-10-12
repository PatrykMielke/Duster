<?php

namespace Database\Seeders;

<<<<<<< HEAD
use App\Models\Brand;
use App\Models\Condition;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\DeliveryMethods;
use App\Models\Material;
=======
use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Color;
use App\Models\PaymentMethods;
>>>>>>> bd08b9d309a6c05282f5b2d710534382b4369383
use Illuminate\Database\Seeder;
use Database\Seeders\MaterialSeeder;

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
<<<<<<< HEAD
        Brand::truncate();
        Condition::truncate();
        DeliveryMethods::truncate();
        Material::truncate();


        $this->call(class: BrandSeeder::class);
        $this->call(class: ConditionSeeder::class);
        $this->call(class: DeliveryMethodSeeder::class);
        $this->call(class: MaterialSeeder::class);

=======
        User::factory(20)->create();
        $this->call(ColorSeeder::class);
        $this->call(PaymentMethodsSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(StatusSeeder::class);
>>>>>>> bd08b9d309a6c05282f5b2d710534382b4369383
    }
}
