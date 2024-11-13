<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'buyer_id',
        'listing_id',
        'payment_method_id',
        'delivery_method_id',
        'address',
        'zipcode',
        'city',
        'country',
        'apartment'
    ];
    use HasFactory;
}
