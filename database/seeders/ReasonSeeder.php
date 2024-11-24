<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reportReasons = [
            ['name' => 'Nękanie'],
            ['name' => 'Groźby'],
            ['name' => 'Dyskryminacja'],
            ['name' => 'Próba oszustwa'],
            ['name' => 'Sprzedaż podrobionych produktów'],
            ['name' => 'Niestosowne zdjęcia'],
        ];

        DB::table('reasons')->insert($reportReasons);
    }
}
