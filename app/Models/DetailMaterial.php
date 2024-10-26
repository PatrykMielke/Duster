<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailMaterial extends Model
{
    public function material()
    {

        return $this->belongsTo(Material::class);
    }
    use HasFactory;
}
