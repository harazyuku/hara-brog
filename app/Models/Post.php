<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // これを書かないと、Post::create で保存できません！
    protected $fillable = ['title', 'category', 'content'];
}
