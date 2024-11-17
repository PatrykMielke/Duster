<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function getCategories()
    {
        // Get the top-level categories, such as 'Women' and 'Men'
        $topCategories = Category::whereNull('parent_id')->with('children.children')->get();

        $navigation = [
            'categories' => $this->buildNavigation($topCategories),
        ];

        return response()->json($navigation);
    }

    private function buildNavigation($categories)
    {
        $result = [];

        foreach ($categories as $category) {
            $sections = [];

            // Loop through first-level children (e.g., "Clothing", "Accessories")
            foreach ($category->children as $section) {
                $items = [];

                // Loop through second-level children (items in each section)
                foreach ($section->children as $item) {
                    $items[] = [
                        'category_id' => $item->id,
                        'name' => $item->name,
                        'href' => route('showByCategory', ['id' => $item->id]), // Or you could store a URL in the database for each item
                    ];
                }

                $sections[] = [
                    'category_id' => $item->id,
                    'id' => strtolower($section->name), // Unique section ID
                    'name' => $section->name,
                    'items' => $items,
                ];
            }

            $result[] = [
                'category_id' => $category->id,
                'id' => strtolower($category->name),
                'name' => $category->name,
                'sections' => $sections,
            ];
        }

        return $result;
    }
}
