<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'listing_id', // lub inne klucze powiązane
        'image',      // dodaj to pole, aby umożliwić masowe przypisanie
    ];
    use HasFactory;
}
