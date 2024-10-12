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
        $colors = [
            'czarny',
            'biały',
            'szary',
            'granatowy',
            'niebieski',
            'czerwony',
            'beżowy',
            'jasnoniebieski',
            'khaki',
            'wielobarwny',
            'zielony',
            'kremowy',
            'ciemnozielony',
            'burgundowy',
            'pomarańczowy',
            'żółty',
            'fioletowy',
            'turkusowy',
            'musztardowy',
            'różowy',
            'pudrowy róż',
            'miętowy',
            'liliowy',
            'morelowy',
            'srebrny',
            'złoty'
        ];

        foreach ($colors as $color) {
            Color::create(['name' => $color]);
        }
    }
}
