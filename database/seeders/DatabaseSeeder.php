<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Condition;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\DeliveryMethods;
use App\Models\Material;
use Illuminate\Database\Seeder;
use Database\Seeders\MaterialSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Brand::truncate();
        Condition::truncate();
        DeliveryMethods::truncate();
        Material::truncate();


        $this->call(class: BrandSeeder::class);
        $this->call(class: ConditionSeeder::class);
        $this->call(class: DeliveryMethodSeeder::class);
        $this->call(class: MaterialSeeder::class);

    }
}
