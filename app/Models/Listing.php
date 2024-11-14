<?php

namespace App\Models;

use App\Models\Item;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Listing extends Model
{

    protected $fillable = [
        'title',
        'description',
        'price',
        'user_id',
        'status_id',
    ];

    public function visits()
    {
        return $this->hasMany(Visit::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }


    public function item()
    {
        return $this->belongsTo(Category::class);
    }

    public function details()
    {
        return $this->hasOne(Detail::class);
    }

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
    public function status()
    {
        return $this->belongsTo(Status::class);
    }
    public function followedBy()
    {
        return $this->hasMany(FollowedListing::class);
    }

    use HasFactory;
}
