<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wine extends Model
{
    /** @use HasFactory<\Database\Factories\WineFactory> */
    use HasFactory;

    public function assignedWinery()
    {
        return $this->belongsTo(Winery::class, 'winery_id');
    }
}
