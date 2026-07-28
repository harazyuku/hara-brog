<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['title', 'category', 'content'])]
#[Hidden(['icon_data', 'icon_mime_type'])]
#[Appends(['has_icon'])]
class Post extends Model
{
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->latest('id');
    }

    /**
     * Select the lightweight attributes needed by post lists.
     */
    public function scopeForListing(Builder $query): void
    {
        $query
            ->select([
                'id',
                'title',
                'category',
                'content',
                'created_at',
                'updated_at',
            ])
            ->selectRaw('icon_data is not null as has_icon');
    }

    /**
     * Determine whether the post has an uploaded list icon.
     */
    protected function hasIcon(): Attribute
    {
        return Attribute::get(
            fn (mixed $value, array $attributes): bool => array_key_exists('has_icon', $attributes)
                ? (bool) $attributes['has_icon']
                : isset($attributes['icon_data']),
        );
    }
}
