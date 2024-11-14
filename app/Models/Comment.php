<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'profile_user_id',
        'rating',
        'comment'
    ];

    // Relacja z użytkownikiem, który dodał komentarz
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacja z użytkownikiem, do którego należy profil
    public function profileUser()
    {
        return $this->belongsTo(User::class, 'profile_user_id');
    }
}
