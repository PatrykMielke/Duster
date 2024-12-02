<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Wallet;
use Laravel\Cashier\Billable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'is_active',
        'avatar'
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function session()
    {
        return $this->hasOne(Session::class);
    }
    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }

    // Define the relationship for "followers" (users who follow this user)
    public function followers(): HasMany
    {
        return $this->hasMany(FollowedUser::class, 'followed_user_id', 'id');
    }

    // Define the relationship for "following" (users that this user follows)
    public function following(): HasMany
    {
        return $this->hasMany(FollowedUser::class, 'user_id', 'id');
    }

    // Method to get the count of followers
    public function followerCount(): int
    {
        return $this->followers()->count();
    }

    // Method to get the count of following
    public function followingCount(): int
    {
        return $this->following()->count();
    }
    public function followedListings()
    {
        return $this->hasMany(FollowedListing::class);
    }
    
}
