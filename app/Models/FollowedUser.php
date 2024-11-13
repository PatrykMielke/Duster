<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowedUser extends Model
{
    use HasFactory;
protected $table = 'followed_users';

    protected $fillable = [
        'user_id',
        'followed_user_id',
    ];
}
