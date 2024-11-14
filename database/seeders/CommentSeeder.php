<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run()
    {
        // Pobieramy użytkowników, których będziemy losowo komentować
        $users = User::whereIn('id', range(1, 100))->pluck('id')->toArray();

        // Iterujemy przez wszystkich użytkowników
        foreach ($users as $userId) {
            // Wybieramy losowo użytkowników, których będziemy komentować (unikamy użytkownika siebie)
            $profileUsers = collect($users)
                ->reject(fn($id) => $id === $userId) // Unikamy komentowania własnego profilu
                ->random(rand(1, 10)) // Każdy użytkownik komentuje od 1 do 30 innych użytkowników
                ->unique(); // Zapewniamy, że nie będą się powtarzać

            // Dla każdego użytkownika dodajemy komentarz do profili
            foreach ($profileUsers as $profileUserId) {
                Comment::create([
                    'user_id' => $userId, // Użytkownik, który dodaje komentarz
                    'profile_user_id' => $profileUserId, // Profil, który jest komentowany
                    'rating' => rand(1, 5), // Losowa ocena (1-5)
                    'comment' => $this->generateRandomComment(), // Losowy komentarz
                ]);
            }
        }
    }

    // Funkcja generująca losowy komentarz
    private function generateRandomComment()
{
    $comments = [
        'Świetny profil, naprawdę imponujące umiejętności! Zdecydowanie można się od Ciebie wiele nauczyć.',
        'Bardzo pomocny profil. Twoje porady i sugestie są nieocenione, z pewnością wrócę tu po więcej.',
        'Twoje doświadczenie w tej dziedzinie jest widoczne. Bardzo doceniam Twoje podejście do problemów.',
        'Twój profil zawiera cenne informacje, które pomogły mi rozwiązać kilka trudnych kwestii. Dziękuję!',
        'Świetne podejście do komunikacji. Zawsze potrafisz przekazać trudne tematy w sposób zrozumiały.',
        'Imponujące doświadczenie! Zdecydowanie warto Cię obserwować, a Twoje wskazówki są bardzo przydatne.',
        'Twoja analiza tematu była bardzo trafna. Szkoda, że nie dodałeś jeszcze kilku przykładów praktycznych.',
        'Profil pełen wartościowych informacji. Widać, że masz dużą wiedzę i chęć dzielenia się nią z innymi.',
        'Twoje komentarze są zawsze szczegółowe i pełne istotnych informacji. Bardzo się cieszę, że trafiłem na Twój profil.',
        'Bardzo konstruktywne podejście do zagadnień. Zawsze potrafisz znaleźć rozwiązania, które są efektywne i praktyczne.',
        'Jestem pod wrażeniem Twojego profesjonalizmu. Twoje porady są mądre i zawsze pełne wartościowych wskazówek.',
        'Twój sposób myślenia i rozwiązywania problemów jest inspirujący. Z pewnością będę wracać po więcej rad.',
        'Twoje uwagi są bardzo precyzyjne i przydatne. Doceniam Twoją zdolność do dokładnego wyjaśniania skomplikowanych kwestii.',
        'Bardzo doceniam Twoje podejście do pracy, pełne zaangażowania i chęci pomocy innym. Masz duży potencjał.',
        'Twoje opinie są zawsze pełne wartościowych insightów. Chciałbym zobaczyć więcej treści dotyczących twoich doświadczeń zawodowych.',
        'Cenię Twoją umiejętność komunikacji i cierpliwości w tłumaczeniu trudnych zagadnień. Na pewno będę polecać Twój profil.',
        'Rzetelne podejście do tematu. Twoje odpowiedzi są zawsze merytoryczne i pełne konkretnych wskazówek.',
        'Jestem naprawdę zadowolony z tego, co zaprezentowałeś na swoim profilu. Twoje doświadczenie i umiejętności są naprawdę godne podziwu.',
        'Bardzo przydatne porady, zwłaszcza Twoje podejście do zarządzania czasem. Z pewnością będę wracać po więcej wskazówek.',
        'Twoje przemyślenia i rozwiązania są zawsze na czasie i dobrze uzasadnione. Świetnie się Ciebie słucha.',
        'Twoje rekomendacje są niezwykle pomocne, bardzo lubię, jak potrafisz zrozumieć potrzeby innych i oferować praktyczne rozwiązania.',
        'Zdecydowanie widać, że jesteś ekspertem w tej dziedzinie. Twoje porady były dla mnie nieocenione w rozwiązaniu problemu.',
        'Bardzo konstruktywna opinia. Twoje podejście do wyzwań zawodowych jest inspirujące i motywujące do działania.',
        'Ciekawy profil, na pewno będę wracać po więcej Twoich wskazówek. Twoje analizy są dokładne i trafne.',
        'Bardzo profesjonalne podejście. Cieszę się, że trafiłem na Twój profil, ponieważ Twoje rekomendacje naprawdę mnie inspirują.',
        'Twoje opinie są zawsze dobrze przemyślane. Potrafisz znaleźć najlepsze rozwiązania i podzielić się nimi z innymi.',
        'Imponujące podejście do pracy i organizacji. Zdecydowanie polecam Twój profil wszystkim szukającym profesjonalnych porad.',
        'Dzięki Twoim wskazówkom udało mi się znacząco poprawić moją efektywność. Z pewnością będę tu zaglądać częściej.',
        'Masz bardzo przemyślane podejście do rozwiązywania problemów. Twoje porady są zawsze dobrze uzasadnione.',
        'Twoje doświadczenie w tej dziedzinie robi wrażenie. Ciekawe analizy i wskazówki, które pomogły mi poszerzyć moją wiedzę.',
        'Twoje komentarze są bardzo przemyślane i dają dużo do myślenia. Na pewno wrócę po więcej wskazówek.',
    ];

    // Losowanie komentarza
    return $comments[array_rand($comments)];
}

}
