import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import TextTicker from "@/Components/TextTicker";

export default function Charts(props) {
    const data = props.chartData;
    console.log(data);

    const seriesData = data.topCategories.map((category, index) => ({
        id: index,
        value: category.total_orders,
        label: `${category.category_name} (${category.top_parent_name})`,
    }));

    const monthNames = [
        "01.",
        "02.",
        "03.",
        "04.",
        "05.",
        "06.",
        "07.",
        "08.",
        "09.",
        "10.",
        "11.",
        "12.",
    ];

    // Extracting month names in Polish and adding year
    const xAxisDataNewUsersYear = data.newUsersInLastYear.map((item) => {
        return `${monthNames[item.month - 1]} ${item.year}`; // Format "Month Year"
    });

    const seriesDataNewUsersYear = data.newUsersInLastYear.map(
        (item) => item.total,
    );
    const xAxisDataListingsByMonth = data.listingsByMonth.map((item) => {
        return `${monthNames[item.month - 1]} ${item.year}`; // Format "Month Year"
    });

    const seriesDataListingsByMonth = data.listingsByMonth.map(
        (item) => item.total,
    );
    const xAxisDataOrdersByMonth = data.ordersByMonth.map((item) => {
        return `${monthNames[item.month - 1]} ${item.year}`; // Format "Month Year"
    });

    const seriesDataOrdersByMonth = data.ordersByMonth.map(
        (item) => item.total,
    );

    const xAxisDataNewListingsYear = data.listingsByYear.map((item) => {
        return `${item.year}`; // Format "Month Year"
    });

    const seriesDataNewListingsYear = data.listingsByYear.map(
        (item) => item.total,
    );
    const xAxisDataOrdersYear = data.ordersByYear.map((item) => {
        return `${item.year}`; // Format "Month Year"
    });

    const seriesDataOrdersYear = data.ordersByYear.map((item) => item.total);

    return (
        <>
            <div className="py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">Użytkowników</dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.totalUsers} />
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">
                                Aktywnych użytkowników
                            </dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.activeUsers} />
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">
                                Nieaktywnych użytkowników
                            </dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.inactiveUsers} />
                            </dd>
                        </div>

                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">
                                Nowych użytkowników dzisiaj
                            </dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.newUsersToday} />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div>
                Nowi użytkownicy w ostatnich 12 miesiącach
                <BarChart
                    xAxis={[
                        {
                            id: "barCategories",
                            data: xAxisDataNewUsersYear, // Month names for x-axis
                            scaleType: "band",
                        },
                    ]}
                    series={[
                        {
                            data: seriesDataNewUsersYear, // Total listings per month for the bars
                            color: "#59a14f",
                        },
                    ]}
                    width={800}
                    height={400}
                />
            </div>

            <div className="py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-2">
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">
                                Wszystkie ogłoszenia
                            </dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.totalListings} />
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">Ogłoszenia dzisiaj</dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.listingsToday} />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div>
                Nowe ogłoszenia w ciągu ostatnich 12 miesięcy
                <BarChart
                    xAxis={[
                        {
                            id: "barCategories",
                            data: xAxisDataListingsByMonth, // Month names for x-axis
                            scaleType: "band",
                        },
                    ]}
                    series={[
                        {
                            data: seriesDataListingsByMonth, // Total listings per month for the bars
                        },
                    ]}
                    width={800}
                    height={400}
                />
            </div>

            <div>
                Ogłoszenia według roku
                <BarChart
                    xAxis={[
                        {
                            id: "barCategories",
                            data: xAxisDataNewListingsYear, // Month names for x-axis
                            scaleType: "band",
                        },
                    ]}
                    series={[
                        {
                            data: seriesDataNewListingsYear, // Total listings per month for the bars
                        },
                    ]}
                    width={800}
                    height={400}
                />
            </div>
            <hr />
            <div className="py-16 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">
                                Wszystkie zamówienia
                            </dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.totalOrders} />
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">Zamówienia dzisiaj</dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.ordersToday} />
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">
                                Zamówienia w tym miesiącu
                            </dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.ordersThisMonth} />
                            </dd>
                        </div>

                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 ">
                                Zamówienia w tym roku
                            </dt>
                            <dd className="order-first text-6xl font-semibold tracking-tight  sm:text-5xl">
                                <TextTicker value={data.ordersThisYear} />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div>
                Nowe zamówienia w ostatnich 12 miesiącach
                <BarChart
                    xAxis={[
                        {
                            id: "barCategories",
                            data: xAxisDataOrdersByMonth, // Month names for x-axis
                            scaleType: "band",
                        },
                    ]}
                    series={[
                        {
                            data: seriesDataOrdersByMonth, // Total listings per month for the bars
                            color: "#e15759",
                        },
                    ]}
                    width={800}
                    height={400}
                />
            </div>

            <div>
                Nowe zamówienia według roku
                <BarChart
                    xAxis={[
                        {
                            id: "barCategories",
                            data: xAxisDataOrdersYear,
                            scaleType: "band",
                        },
                    ]}
                    series={[
                        {
                            data: seriesDataOrdersYear,
                            color: "#e15759",
                        },
                    ]}
                    width={800}
                    height={400}
                />
            </div>

            <div>
                Najczęściej sprzedające się kategorie
                <PieChart
                    series={[
                        {
                            data: seriesData,
                        },
                    ]}
                    width={800}
                    height={400}
                    sx={{ paddingTop: "2rem" }}
                />
            </div>
        </>
    );
}
