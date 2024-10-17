<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    public function visits()
    {
        return $this->hasMany(Visit::class);
    }
    use HasFactory;
}
