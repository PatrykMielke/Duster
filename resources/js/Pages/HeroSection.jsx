export default function HeroSection() {
    return (
        <section
            class="relative w-[100vw] h-[80vh] bg-[url('49104_1.13.jpg')] bg-cover bg-center"
            style={{ left: "calc(-50vw + 50%)", top: -30 }}
        ></section>
    );
}
<div className="mx-auto max-w-7xl  py-6 sm:px-6 ">
    <div class="relative z-1 flex items-center justify-start h-full px-24">
        <div class="text-gray-300 p-12 rounded-2xl text-left max-w-md bg-gray-500 bg-opacity-30">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">
                Ciuchy kurzą się w szafie?
            </h1>
            <p class="text-lg mb-6">Sprzedaj je na Dusterze!</p>
            <a
                href="#explore"
                class="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-xl font-semibold"
            >
                Sprzedaj
            </a>
        </div>
    </div>
</div>;

/* width: 100vw;
  position: relative;
  left: calc(-50vw + 50%); */
