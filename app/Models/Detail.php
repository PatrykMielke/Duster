<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    // Add the fillable attributes
    protected $fillable = [
        'item_id',
        'size_id',
        'brand_id',
        'condition_id',
        'listing_id', // Ensure this is included as well if you're using it in the create
        // Add any other fields that need mass assignment
    ];

    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function condition()
    {
        return $this->belongsTo(Condition::class);
    }

    public function detailColor()
    {
        return $this->hasMany(DetailColor::class);
    }

    public function detailMaterial()
    {
        return $this->hasMany(DetailMaterial::class);
    }

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
    use HasFactory;
}
