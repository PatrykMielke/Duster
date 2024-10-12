<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $brands = [
            'Nike',
            'Adidas',
            'Puma',
            'Zara',
            'H&M',
            'Levi\'s',
            'Gucci',
            'Prada',
            'Versace',
            'Chanel',
            'Louis Vuitton',
            'Dolce & Gabbana',
            'Balenciaga',
            'Tommy Hilfiger',
            'Calvin Klein',
            'Lacoste',
            'Ralph Lauren',
            'Armani',
            'Diesel',
            'Under Armour',
            'The North Face',
            'Columbia',
            'Patagonia',
            'Reebok',
            'New Balance',
            'Bershka',
            'Massimo Dutti',
            'Uniqlo',
            'Supreme',
            'Moncler', ];

        foreach ($brands as $brand) {
            Brand::create(['name' => $brand]);
        }   
    }   
}
