<?php

namespace App\Models;

use App\Models\User;
use App\Models\Listing;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FollowedListing extends Model
{
    protected $fillable = ['user_id', 'listing_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
    use HasFactory;
}
