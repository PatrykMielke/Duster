<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailMaterial extends Model
{

    // Add the fillable attributes
    protected $fillable = [
        'material_id',
        'detail_id',
    ];
    public function material()
    {

        return $this->belongsTo(Material::class);
    }

    public function detail()
    {
        return $this->belongsTo(Detail::class);
    }

    use HasFactory;
}
