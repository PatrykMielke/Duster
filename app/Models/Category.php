<?php

namespace App\Models;

use App\Models\Sex;
use App\Models\Item;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id', 'id');
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    /*

        $category = Category::find($id);
        // parent category
        $category->parent
        // child categories
        $category->children


        # Instead of
        Category::where('parent_id',0)->get();          // returns a Collection of Category models
        # try
        Category::where('parent_id',0)->first();        // returns a Category model
        # or
        Category::where('parent_id',0)->get()->first(); // returns first item of Collection of Category models
    */

}
