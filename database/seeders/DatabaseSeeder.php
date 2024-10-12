<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Color;
use App\Models\Status;
use App\Models\Category;
use App\Models\Material;
use App\Models\Condition;
use App\Models\PaymentMethods;
use App\Models\DeliveryMethods;
use Illuminate\Database\Seeder;

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
        Color::truncate();
        PaymentMethods::truncate();
        Category::truncate();
        Status::truncate();
        User::truncate();

        $this->call(class: BrandSeeder::class);
        $this->call(class: ConditionSeeder::class);
        $this->call(class: DeliveryMethodSeeder::class);
        $this->call(class: MaterialSeeder::class);

        User::factory(20)->create();
        $this->call(ColorSeeder::class);
        $this->call(PaymentMethodsSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(StatusSeeder::class);
    }
}