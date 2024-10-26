<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailColor extends Model
{

    public function color()
    {

        return $this->belongsTo(Color::class);
    }
    use HasFactory;
}
