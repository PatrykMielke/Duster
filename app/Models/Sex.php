<?php

namespace App\Models;

use App\Models\Item;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sex extends Model
{

    use HasFactory;

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
