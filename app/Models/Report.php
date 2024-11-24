<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'reason_id',
        'reference_id',
        'type',
        'reported_by',
        'description',
    ];

    /**
     * Obsługiwane typy zgłoszeń.
     */
    public const TYPE_COMMENT = 'comment';
    public const TYPE_USER = 'user';
    public const TYPE_ANNOUNCEMENT = 'announcement';

    /**
     * Zwraca wszystkie obsługiwane typy jako tablicę.
     */
    public static function getTypes(): array
    {
        return [
            self::TYPE_COMMENT,
            self::TYPE_USER,
            self::TYPE_ANNOUNCEMENT,
        ];
    }
    public function Reporter()
    {
        return $this->belongsTo(User::class, 'reported_by');
    }

    use HasFactory;
}
