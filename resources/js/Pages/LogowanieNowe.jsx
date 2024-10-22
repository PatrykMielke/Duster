import React, { useState } from 'react';
import SignIn from './LoginSignInComp'; // Updated import path
import SignUp from './LoginSignUpComp'; // Updated import path

function App() {
    const [isActive, setIsActive] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-indigo-200">
            <div className="relative w-full max-w-[900px] h-[500px] bg-white rounded-[50px] shadow-2xl overflow-hidden">

                <div className={`absolute inset-0 flex transition-transform duration-700 ease-in-out ${isActive ? '' : ''}`}>
                    <div className={`w-full h-full p-10 flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'} `}>
                        <SignUp />
                    </div>

                    <div className={`w-full h-full p-10 flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-0' : 'opacity-100'} `}>
                        <SignIn />
                    </div>
                </div>

                <div className={`absolute rounded-[50px] inset-y-0 w-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center transition-transform duration-700 ease-in-out ${isActive ? 'translate-x-full' : ''}`}>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">{isActive ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
                        <p className="mt-4 mb-6 text-sm">
                            {isActive
                                ? 'Enter your personal details and start your journey with us'
                                : 'To keep connected, please sign in with your personal info'}
                        </p>
                        <button
                            className="bg-transparent border-2 border-white px-6 py-2 rounded-lg uppercase tracking-wider hover:bg-white hover:text-purple-600 transition-all"
                            onClick={() => setIsActive(!isActive)}
                        >
                            {isActive ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
