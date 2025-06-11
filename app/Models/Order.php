<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [ 'buyer_id', 'listing_id', 'payment_method_id',
        'delivery_method_id', 'address', 'zipcode', 'city', 'country', 'apartment'
    ];

    public function buyer() {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function listing() {
        return $this->belongsTo(Listing::class, 'listing_id');
    }

    public function paymentMethod(){
        return $this->belongsTo(PaymentMethods::class, 'payment_method_id');
    }

    public function deliveryMethod(){
        return $this->belongsTo(DeliveryMethods::class, 'delivery_method_id');
    }
}
