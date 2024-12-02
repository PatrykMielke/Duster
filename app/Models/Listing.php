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
    protected $appends = ['follow_count', 'visits_count'];


    /**
     * Accessor for the unique_user_count attribute.
     *
     * @return int
     */
    public function getVisitsCountAttribute()
    {
        return $this->visits()->distinct('user_id')->count('user_id');
    }
    public function getFollowCountAttribute(): int
    {
        return $this->follows()->count();
    }

    public function follows()
    {
        return $this->hasMany(FollowedListing::class, 'listing_id');
    }

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
    public function orders()
    {
        return $this->belongsTo(Order::class);
    }

    use HasFactory;
}
