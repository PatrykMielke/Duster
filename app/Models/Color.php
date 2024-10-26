<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    public function detailColors()
    {
        return $this->hasMany(DetailColor::class);
    }
    use HasFactory;
}
