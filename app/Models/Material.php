<?php

namespace App\Models;

use App\Models\DetailMaterial;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Material extends Model
{
    public function material()
    {

        return $this->hasMany(DetailMaterial::class);
    }

    use HasFactory;
}
