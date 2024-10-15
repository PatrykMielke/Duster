<?php

namespace App\Models;

use App\Models\Sex;
use App\Models\Item;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    public function sexes()
    {
        return $this->belongsTo(Sex::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
