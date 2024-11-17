<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Support\Facades\Auth;

use App\Models\Size;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Color;
use Inertia\Response;
use App\Models\Detail;
use App\Models\Status;
use App\Models\Comment;
use App\Models\Listing;
use App\Models\Category;
use App\Models\Material;
use App\Models\Condition;
use Illuminate\Http\Request;
use App\Models\PaymentMethods;
use calculateLastActivityDate;
use App\Models\DeliveryMethods;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */ public function index(Request $request)
    {
        $query = $request->input('query');

        $listingsQuery = Listing::with(['user', 'galleries'])
            ->orderBy('created_at', 'desc')
            ->where('status_id', 1);

        if ($query) {
            $listingsQuery->where('title', 'like', "%{$query}%");
        }

        $listings = $listingsQuery->get();

        return Inertia::render('Listing/Listings', [
            'products' => $listings,
            'filters' => [
                'query' => $query,
            ],
        ]);
    }

    public function showByCategory($categoryId)
{
    // Jeśli nie ma produktów o takiej kategorii
    $listings = Listing::whereHas('details', function ($query) use ($categoryId) {
        $query->where('category_id', $categoryId);
    })
    ->with(['user', 'galleries', 'details.category', 'details'])  // Eager load the relationships
    ->get();

    // Pobierz kategorię na podstawie ID
$category = Category::find($categoryId);

    // Sprawdź, czy kategoria istnieje
    if (!$category) {
        return redirect()->route('index');
    }

    // Pobierz breadcrumbs dla kategorii
    $breadcrumbs = $category->getBreadcrumbs($categoryId);

    // Renderowanie widoku z listingami
    return Inertia::render('Listing/Listings', [
        'products' => $listings,
        'category' => $category->name,
        'breadcrumbs' => $breadcrumbs,  // Przekaż breadcrumbs do widoku
    ]);
}



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $statuses = Status::all();
        $colors = Color::all();
        $sizes = Size::all();
        $brands = Brand::all();
        $materials = Material::all();
        $conditions = Condition::all();

        return Inertia::render('Listing/Create', [
            'statuses' => $statuses,
            'colors' => $colors,
            'sizes' => $sizes,
            'brands' => $brands,
            'materials' => $materials,
            'conditions' => $conditions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request): RedirectResponse
    {
        // Debugowanie danych wejściowych
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|max_digits:8,2',
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:statuses,id',
            'condition_id' => 'required|exists:conditions,id',
            'item_id' => 'required|exists:items,id',
            'color_ids' => 'required|array',
            'color_ids.*' => 'exists:colors,id',
            'size_id' => 'required|exists:sizes,id',
            'brand_id' => 'required|exists:brands,id',
            'material_ids' => 'required|array',
            'material_ids.*' => 'exists:materials,id',
            'images' => 'array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $listing = Listing::create($request->only('title', 'description', 'price', 'user_id', 'status_id'));

        $detail = $listing->details()->create(array_merge(
            $request->only('item_id', 'size_id', 'brand_id', 'condition_id'),
            ['listing_id' => $listing->id]
        ));

        foreach ($request->color_ids as $color_id) {
            $detail->detailColor()->create([
                'color_id' => $color_id,
                'detail_id' => $detail->id,
            ]);
        }

        foreach ($request->material_ids as $material_id) {
            $detail->detailMaterial()->create([
                'material_id' => $material_id,
                'detail_id' => $detail->id,
            ]);
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                try {
                    $imagePath = $image->store('images', 'public');

                    // Zapis ścieżki do obrazu w bazie danych
                    $listing->galleries()->create([
                        'image' => Storage::url($imagePath),
                        'listing_id' => $listing->id,
                    ]);
                } catch (\Exception $e) {
                    // Obsługa błędu zapisu
                    return redirect()->back()->withErrors(['error' => 'Wystąpił problem z zapisem obrazu: ' . $e->getMessage()]);
                }
            }
        }

        return redirect()->route('HomePage')->with('success', 'Ogłoszenie dodane pomyślnie.');
    }



    /**
     * Display specified
     */
    public function show($id)
    {
        dd($id);
        $listing = Listing::with([
            'user',
            'galleries',
            'details.size',
            'details.brand',
            'details.condition',
            'details.detailColor.color',
            'details.detailMaterial.material',
        ])->findOrFail($id);


        $category = new Category();
        $breadcrumbs = $category->getBreadcrumbs($listing->details->category_id);
        $listing->breadcrumbs = $breadcrumbs;
        // Pobierz użytkownika powiązanego z ogłoszeniem
        $user = $listing->user;

        // Pobierz średnią ocenę dla komentarzy użytkownika (średnia z jego komentarzy)
        $averageRating = Comment::where('profile_user_id', $user->id)
            ->avg('rating'); // Obliczamy średnią ocenę
        $ratingCount = $user->comments()->count('rating');

        // Możesz dodać średnią ocenę do obiektu $listing
        $listing->averageRating = $averageRating;
        $listing->ratingCount = $ratingCount;

        $uniqueUserCount = $listing->visits()->distinct('user_id')->count('user_id');


        return Inertia::render('Listing/ListingDetails', [
            'listing' => $listing,
            'uniqueUserCount' => $uniqueUserCount,
        ]);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Show the form for editing the specified resource.
     */

    public function edit($id): Response | RedirectResponse
    {

        // if (Auth::check() && Auth::user()->id != $id) {
        //     // Zwróć błąd 403 zamiast przekierowania
        //     abort(403, 'Unauthorized action.');
        // }

        // Jeśli użytkownik jest uprawniony do edycji
        $listing = Listing::with(['details', 'details.category', 'details.size', 'details.brand', 'details.condition', 'details.detailColor', 'details.detailMaterial'])->findOrFail($id);
        $category_id = $listing->details->category_id;

        $statuses = Status::all();
        $conditions = Condition::all();
        $colors = Color::orderBy('name')->get();
        $sizes = Size::orderBy('name')->get();
        $brands = Brand::orderBy('name')->get();
        $materials = Material::orderBy('name')->get();
        $categories = Category::all();

        $cat = new CategoryController();
        $categories_hierarchy = $cat->getCategories();



        // $categories = $this->getCategories();
        $cat = new Category();
        $breadcrumbs = $cat->getBreadcrumbs($listing->details->category_id);

        return Inertia::render('Listing/Edit', [
            'listing' => $listing,
            'statuses' => $statuses,
            'conditions' => $conditions,
            'colors' => $colors,
            'sizes' => $sizes,
            'brands' => $brands,
            'materials' => $materials,
            'categories_hierarchy' => $categories_hierarchy,
            'breadcrumbs' => $breadcrumbs,
            'categories' => $categories
        ]);
    }

    // Method to handle the update request
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:statuses,id',
            'condition_id' => 'required|exists:conditions,id',
            'item_id' => 'required|exists:items,id',
            'color_ids' => 'required|array',
            'color_ids.*' => 'exists:colors,id',
            'size_id' => 'required|exists:sizes,id',
            'brand_id' => 'required|exists:brands,id',
            'material_ids' => 'required|array',
            'material_ids.*' => 'exists:materials,id',
        ]);

        $listing = Listing::findOrFail($id);
        $listing->update($request->only('title', 'description', 'price', 'user_id', 'status_id'));

        $detail = $listing->details()->first();
        $detail->update($request->only('item_id', 'size_id', 'brand_id', 'condition_id'));

        $detail->detailColor()->delete();
        foreach ($request->color_ids as $color_id) {
            $detail->detailColor()->create([
                'color_id' => $color_id,
                'detail_id' => $detail->id,
            ]);
        }

        $detail->detailMaterial()->delete();
        foreach ($request->material_ids as $material_id) {
            $detail->detailMaterial()->create([
                'material_id' => $material_id,
                'detail_id' => $detail->id,
            ]);
        }

        return redirect()->route('HomePage')->with('success', 'Ogłoszenie zaktualizowane pomyślnie.');
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    public function getCategories()
    {
        $topCategories = Category::whereNull('parent_id')->with('children.children')->get();

        // Zwracamy wynik w nowej strukturze
        return $this->buildStructuredNavigation($topCategories);
    }

    private function buildStructuredNavigation($categories)
    {
        $plec = [];
        $kategoria = [];
        $przedmiot = [];

        foreach ($categories as $category) {
            // Dodajemy kategorię najwyższego poziomu do "plec"
            $plec[] = [
                'id' => $category->id,
                'name' => $category->name,
            ];

            foreach ($category->children as $section) {
                // Dodajemy sekcję do "kategoria"
                $kategoria[] = [
                    'id' => $section->id,
                    'name' => $section->name,
                    'parent_id' => $category->id,
                ];

                foreach ($section->children as $item) {
                    // Dodajemy przedmiot do "przedmiot"
                    $przedmiot[] = [
                        'id' => $item->id,
                        'name' => $item->name,
                        'parent_id' => $section->id,
                        'href' => route('showByCategory', ['id' => $item->id]),
                    ];
                }
            }
        }
        // Zwracamy obiekt z trzema tablicami
        return (object) [
            'sexes' => $plec,
            'categories' => $kategoria,
            'items' => $przedmiot,
        ];
    }












    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing)
    {
        //
    }
}
