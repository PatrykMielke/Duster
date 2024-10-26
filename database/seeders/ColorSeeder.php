<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Associative array of colors with their hex codes
        $colors = [
            ['name' => 'czarny', 'hex' => '#000000'],
            ['name' => 'biały', 'hex' => '#FFFFFF'],
            ['name' => 'szary', 'hex' => '#808080'],
            ['name' => 'granatowy', 'hex' => '#000080'],
            ['name' => 'niebieski', 'hex' => '#0000FF'],
            ['name' => 'czerwony', 'hex' => '#FF0000'],
            ['name' => 'beżowy', 'hex' => '#F5F5DC'],
            ['name' => 'jasnoniebieski', 'hex' => '#ADD8E6'],
            ['name' => 'khaki', 'hex' => '#F0E68C'],
            ['name' => 'zielony', 'hex' => '#008000'],
            ['name' => 'kremowy', 'hex' => '#FFFDD0'],
            ['name' => 'ciemnozielony', 'hex' => '#006400'],
            ['name' => 'burgundowy', 'hex' => '#800020'],
            ['name' => 'pomarańczowy', 'hex' => '#FFA500'],
            ['name' => 'żółty', 'hex' => '#FFFF00'],
            ['name' => 'fioletowy', 'hex' => '#800080'],
            ['name' => 'turkusowy', 'hex' => '#40E0D0'],
            ['name' => 'musztardowy', 'hex' => '#FFDB58'],
            ['name' => 'różowy', 'hex' => '#FFC0CB'],
            ['name' => 'pudrowy róż', 'hex' => '#FDDDE6'],
            ['name' => 'miętowy', 'hex' => '#98FF98'],
            ['name' => 'liliowy', 'hex' => '#C8A2C8'],
            ['name' => 'morelowy', 'hex' => '#FFB07C'],
            ['name' => 'srebrny', 'hex' => '#C0C0C0'],
            ['name' => 'złoty', 'hex' => '#FFD700'],
        ];

        foreach ($colors as $color) {
            Color::create([
                'name' => $color['name'],
                'hex' => $color['hex']
            ]);
        }
    }
}
