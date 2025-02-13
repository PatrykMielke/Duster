import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Layout from '@/Layouts/Layout';
import SnackbarNotification from '@/components/SnackbarNotification'; // Import the Snackbar component

export default function Wallet({ auth, wallet, message, severity }) {
    const [currentBalance, setCurrentBalance] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState();
    const [snackbarSeverity, setSnackbarSeverity] = useState(severity);
    const { errors } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const user_id = auth?.user?.id;

    useEffect(() => {
        if (wallet && wallet.balance !== undefined) {
            setCurrentBalance(wallet.balance);
        }
    }, [wallet]);


    useEffect(() => {
        if (message) {
            setSnackbarMessage(message);
            setSnackbarSeverity(severity);
            setSnackbarOpen(true);
        }
    }, [message, severity]);

    // Add balance to the wallet
    const addBalance = (amount) => {
        setIsLoading(true);
        const formattedAmount = amount.toFixed(2);

        router.post('/portfel', { amount: formattedAmount, user_id }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setIsLoading(false);
                if (message) {
                    setSnackbarMessage(message);
                    setSnackbarSeverity(severity);
                    setSnackbarOpen(true);
                }
            }
        });
    };

    // Predefined amounts for the user to add to their wallet
    const amounts = [10, 20, 50, 100, 500];

    // Close the snackbar (called when user clicks close or after a timeout)
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
                            className="flex items-center justify-center px-4 py-2 border border-transparent bg-indigo-500 text-white mx-4 py-2 px-4 border-slate-800 rounded-lg text-md font-semibold"
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

            {/* Snackbar to display the message */}
            <SnackbarNotification
                open={snackbarOpen}
                message={snackbarMessage}  // Pass the message from the backend
                severity={snackbarSeverity}
                handleClose={handleSnackbarClose}  // Function to close snackbar
            />
        </Layout>
    );
}
