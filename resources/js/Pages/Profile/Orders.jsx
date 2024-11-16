import Layout from "@/Layouts/Layout";

export default function Orders({ orders }) {
    console.log(orders);
    return (
        <Layout>
            <ul role="list" className="divide-y divide-gray-100">
                {orders.map((order) => (
                    <li
                        key={order.id}
                        className="flex justify-between gap-x-6 py-5"
                    >
                        {/* Left Section: Delivery info + Listing */}
                        <div className="flex min-w-0 gap-x-4">
                            <img
                                alt="brak"
                                src={
                                    order.listing.user.avatar ||
                                    "/placeholder-avatar.png"
                                } // Placeholder jeśli brak avatara
                                className="h-24 w-24 flex-none rounded-full bg-gray-50"
                            />
                            <div className="min-w-0 flex-auto">
                                <p className="text-3xl font-semibold text-gray-900">
                                    {order.listing.title}
                                </p>
                                <p className="mt-1 truncate text-m text-gray-500">
                                    Sprzedający: {order.listing.user.name}
                                </p>
                            </div>
                        </div>

                        {/* Right Section: Order details */}
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="mt-1 text-lg text-gray-500">
                                Cena: {order.listing.price}zł
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Zamówiono{" "}
                                <time dateTime={order.created_at}>
                                    {new Date(
                                        order.created_at,
                                    ).toLocaleDateString()}
                                </time>
                            </p>
                            <a
                                href={`/ogloszenia/${order.listing.id}`}
                                className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Szczegóły →
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
