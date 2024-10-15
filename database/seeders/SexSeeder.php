<?php

namespace Database\Seeders;

use App\Models\Sex;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SexSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sexes = [
            'Kobieta',
            'Mezczyzna',
            'Dziecko',
            //'Unisex',
        ];

        foreach ($sexes as $sex) {
            $sex = Sex::create(['name' => $sex]);
        }
    }
}
