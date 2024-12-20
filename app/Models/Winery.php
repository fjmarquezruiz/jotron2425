<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Winery extends Model
{
    /** @use HasFactory<\Database\Factories\WineryFactory> */
    use HasFactory;

    protected $fillable = ['name', 'city', 'province'];

    public function wines()
    {
        return $this->hasMany(Wine::class);
    }
}
