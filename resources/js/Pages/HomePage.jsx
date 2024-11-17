import { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import SnackbarNotification from "@/components/SnackbarNotification"; // Importujemy komponent Snackbar
import HeroSection from "./HeroSection";
import Listings from "@/components/Listings";
function Search(props) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh]  ">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Znajdź to czego szukasz!
            </h1>

            {/* Search Bar */}
            <form
                onSubmit={props.handleSearchSubmit}
                className="w-full max-w-xl"
            >
                <div className="relative">
                    <input
                        type="text"
                        value={props.searchQuery.query}
                        onChange={props.handleSearchChange}
                        placeholder="Czego szukasz?"
                        className="w-full rounded-full border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Szukaj
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function HomePage({ message, listings }) {
    const [searchQuery, setSearchQuery] = useState({
        query: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false); // Stan dla Snackbara
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Komunikat dla Snackbara

    const handleSearchChange = (e) => {
        setSearchQuery({ query: e.target.value });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search query:", searchQuery);

        router.get("/listings", searchQuery, {
            onFinish: () => {
                setSnackbarMessage("Wyszukiwanie zakończone"); // Domyślny komunikat po wyszukaniu
                setSnackbarOpen(true);
            },
            onError: () => {
                setSnackbarMessage("Wystąpił błąd podczas wyszukiwania");
                setSnackbarOpen(true);
            },
        });
    };

    useEffect(() => {
        if (message) {
            // Jeśli jest message w props, wyświetl je w Snackbarze
            setSnackbarMessage(message);
            setSnackbarOpen(true);
        }
    }, [message]); // Zależność od props.message, żeby za każdym razem reagować na zmianę komunikatu

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Layout>
                <HeroSection />
                <Search
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleSearchSubmit={handleSearchSubmit}
                />

                {/* Snackbar Notification */}
                <SnackbarNotification
                    open={snackbarOpen}
                    message={snackbarMessage} // Wyświetlamy przekazany komunikat
                    handleClose={handleSnackbarClose} // Funkcja do zamknięcia Snackbara
                />

                <Listings products={listings} />
            </Layout>
        </>
    );
}
