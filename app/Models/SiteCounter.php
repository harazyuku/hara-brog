<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SiteCounter extends Model
{
    public $incrementing = false;

    protected $primaryKey = 'key';

    protected $keyType = 'string';

    /**
     * Reserve the next visitor number atomically.
     */
    public static function claimVisitorNumber(): int
    {
        return DB::transaction(function (): int {
            /** @var SiteCounter $counter */
            $counter = static::query()
                ->whereKey('visitors')
                ->lockForUpdate()
                ->firstOrFail();

            $counter->increment('value');

            return (int) $counter->value;
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'value' => 'integer',
        ];
    }
}
