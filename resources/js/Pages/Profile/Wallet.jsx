import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Layout from '@/Layouts/Layout';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Wallet({ auth, wallet }) {
    const [currentBalance, setCurrentBalance] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Stan otwarcia snackbara
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Przechowywanie komunikatu
    const { errors } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const user_id = auth?.user?.id;

    // Ustawienie salda
    useEffect(() => {
        if (wallet && wallet.balance !== undefined) {
            setCurrentBalance(wallet.balance);
        }
    }, [wallet]);

    // Funkcja do dodawania salda
    const addBalance = (amount) => {
        setIsLoading(true);
        const formattedAmount = amount.toFixed(2);

        router.post('/portfel', { amount: formattedAmount, user_id }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setIsLoading(false);
                // Wyświetl snackbar po zakończeniu transakcji
                setSnackbarMessage("Płatność przebiegła pomyślnie!");
                setSnackbarOpen(true);
            }
        });
    };

    const amounts = [10, 20, 50, 100, 500];

    // Funkcja do zamknięcia snackbara
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Doładuj konto</h1>
                <div className="mb-6 text-center">
                    <p className="text-xl">Saldo {currentBalance} zł</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {amounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => addBalance(amount)}
                            disabled={isLoading}
                            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                            Doładuj {amount} zł
                        </button>
                    ))}
                </div>
                {errors.amount && (
                    <div className="mt-4 text-red-600 text-center" role="alert">
                        {errors.amount}
                    </div>
                )}
                {isLoading && (
                    <div className="mt-4 text-center text-gray-600">
                        Processing...
                    </div>
                )}
            </div>

            {/* Snackbar z komunikatem */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Layout>
    );
}
