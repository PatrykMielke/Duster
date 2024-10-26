<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{

    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function condition()
    {
        return $this->belongsTo(Condition::class);
    }

    public function detailColor()
    {
        return $this->hasMany(DetailColor::class);
    }

    public function detailMaterial()
    {
        return $this->hasMany(DetailMaterial::class);
    }


    use HasFactory;
}
