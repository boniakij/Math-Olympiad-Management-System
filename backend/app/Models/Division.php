<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Division extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
    ];

    public function districts(): HasMany
    {
        return $this->hasMany(District::class);
    }

    public function centers(): HasMany
    {
        return $this->hasMany(Center::class);
    }
}