<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        // if(!$id = auth()->id()) return redirect()->route('index');
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

        return response()->json(['message'=>'success']); // Zwróć utworzony komentarz w odpowiedzi
    }

    public function index($profileUserId)
    {
        // Pobierz komentarze dla profilu
        $comments = Comment::with('user')
            ->where('profile_user_id', $profileUserId)
            ->orderBy('created_at','desc')
            ->get();
        return response()->json($comments);
    }

    public function getComments($userId){
        $comments = Comment::with('user') // Załaduj dane użytkownika powiązanego z każdym komentarzem
            ->where('profile_user_id', $userId)
            ->orderBy('created_at', 'desc') // Opcjonalnie możesz posortować po dacie
            ->get();
        return response()->json($comments);
    }
    public function destroy($commentId){
        Comment::where('id', $commentId)->delete();
        return response()->json(['message'=>'Deleted Successfully']);
    }
}
