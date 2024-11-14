<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        // Walidacja danych
        $validated = $request->validate([
            'profile_user_id' => 'required|exists:users,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:1000',
        ]);

        // Tworzenie nowego komentarza
        $comment = Comment::create([
            'user_id' => auth()->id(), // ID użytkownika, który dodaje komentarz
            'profile_user_id' => $validated['profile_user_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return response()->json($comment, 201); // Zwróć utworzony komentarz w odpowiedzi
    }

    public function index($profileUserId)
    {
        // Pobierz komentarze dla profilu
        $comments = Comment::where('profile_user_id', $profileUserId)->get();

        return response()->json($comments);
    }
}
