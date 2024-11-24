<?php

namespace Database\Seeders;

use App\Models\Reason;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 60; $i++) {


            $types = ['user', 'comment', 'listing'];
            $randomType = $types[array_rand($types)];


            Report::create([
                'reason_id' => Reason::inRandomOrder()->first()->id,
                'reference_id' => rand(1, 100),
                'type' => $randomType,
                'reported_by' => User::inRandomOrder()->first()->id,
                'description' => fake()->paragraph(1),
            ]);
        }
    }
}
