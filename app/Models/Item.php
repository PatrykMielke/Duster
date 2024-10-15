<?php

namespace App\Models;

use App\Models\Sex;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{

    use HasFactory;

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
}
