<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailColor extends Model
{
    protected $fillable = [
        'color_id',
        'detail_id',
    ];
    public function color()
    {

        return $this->belongsTo(Color::class);
    }

    public function detail()
    {
        return $this->belongsTo(Detail::class);
    }
    use HasFactory;
}
