import Navbar from "../Components/Navbar";
import Example from "./ProductDetails";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
    return (
        <>
            <div className="min-h-full">
            <header className="relative z-10 bg-white">
            <Navbar />

            </header>

              
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        { children }
                    </div>
                </main>
            </div>
        </>
    );
}
