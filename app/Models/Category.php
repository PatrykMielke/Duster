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
    public function details()
    {
        return $this->hasOne(Detail::class);
    }

    // Rekurencyjna funkcja do tworzenia breadcrumbs
    public function getBreadcrumbs($categoryId)
    {
        // Znajdź kategorię na podstawie id
        $category = Category::find($categoryId);

        $breadcrumbs = [];

        // Rekurencyjnie zbieramy breadcrumbs
        while ($category) {
            $breadcrumbs[] = [
                'id' => $category->id,
                'name' => $category->name,
                'href' => "/kategoria/{$category->id}",
            ];

            // Przejdź do kategorii nadrzędnej
            $category = $category->parent;
        }

        // Odwróć tablicę, aby breadcrumbs były w odpowiedniej kolejności
        return array_reverse($breadcrumbs);
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
