<?php

namespace Database\Seeders;

use App\Models\Condition;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class conditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $condition = [
            'Nowy z metką',
            'Nowy bez metki',
            'Bardzo dobry',
            'Dobry',
            'Średni',
            'Zniszczony'];

        foreach ($condition as $condition) {
            Condition::create(['name' => $condition]);
        }
    }
}
