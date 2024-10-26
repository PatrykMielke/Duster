<?php

namespace Database\Seeders;

use App\Models\Sex;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Ubranie',
            'Obuwie ',
            'Akcesoria',

        ];
        $sexes = Sex::all();
        foreach ($sexes as $sex) {

            foreach ($categories as $category) {

                Category::create([
                    'name' => $category,
                    'sex_id' => $sex->id,
                ]);
            }
        }
    }
}
