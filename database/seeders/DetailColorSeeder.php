<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Detail;
use App\Models\DetailColor;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;

class DetailColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $details = Detail::all();
        $colors = Color::all();

        foreach ($details as $detail) {
            $colorIds = $colors->random(2)->pluck('id'); // Randomly get 2 colors for each detail

            foreach ($colorIds as $colorId) {
                DetailColor::create([
                    'detail_id' => $detail->id,
                    'color_id' => $colorId
                ]);
            }
        }
    }
}
