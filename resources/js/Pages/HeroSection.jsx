import { Link } from "@inertiajs/react";

export default function HeroSection() {
    return (
        <section
            className="relative w-[99.5vw] h-[80vh] bg-[url('49104_1.13.jpg')] bg-cover bg-center"
            style={{ left: "calc(-50vw + 50%)", top: -30 }}
        >
            <div className="mx-auto max-w-7xl">
                <div className="absolute z-1 flex items-center justify-start h-auto px-8">
                    <div className="text-gray-700 mt-80 p-12 rounded-2xl text-left max-w-md bg-white bg-opacity-90">
                        <h1 className="text-4xl md:text-6xl font-bold mb-10">
                            Ciuchy kurzą się w szafie?
                        </h1>

                        <Link
                            href={route("listings.create")}
                            className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-8 border-slate-800 rounded-lg text-xl font-semibold"
                        >
                            Sprzedaj je na Dusterze!
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
