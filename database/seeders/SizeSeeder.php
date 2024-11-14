<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
        '30','31','32','33','34','35', '36', '37', '38', '39', '40', '41',
        '42', '43', '44', '45', '46','47','48','49','50','51','52',
        '28x30', '30x30', '32x30', '34x30', '36x30', '38x30', '40x30',
        '28x32', '30x32', '32x32', '34x32', '36x32', '38x32', '40x32',
        '28x34', '30x34', '32x34', '34x34', '36x34', '38x34', '40x34',
            ];

        foreach ($sizes as $size) {
            Size::create(['name' => $size]);
        }
    }
}
