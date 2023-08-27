<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'path', 'duration', 'listening', 'player_id'
    ];

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class);
    }
}
