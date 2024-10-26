<?php

namespace Database\Seeders;

use App\Models\Detail;
use App\Models\Material;
use App\Models\DetailMaterial;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DetailMaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $details = Detail::all();
        $materials = Material::all();

        foreach ($details as $detail) {
            $materialIds = $materials->random(2)->pluck('id');

            foreach ($materialIds as $materialId) {
                DetailMaterial::create([
                    'detail_id' => $detail->id,
                    'material_id' => $materialId
                ]);
            }
        }
    }
}
