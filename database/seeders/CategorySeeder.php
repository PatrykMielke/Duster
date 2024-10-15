<?php

namespace Database\Seeders;

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

        foreach ($categories as $category) {
            for ($i = 0; $i < 3; $i++){
                Category::create([
                    'name' => $category,
                    'sex_id' => $i+1,
                ]);
        }
        }
    }
}
