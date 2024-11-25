import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import TextTicker from "@/Components/TextTicker";
export default function Charts(props) {
    const data = props.chartData;
    console.log(data);



    const seriesData = data.topCategories.map((category, index) => ({
        id: index,
        value: category.total_orders,
        label: category.category_name,
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

    const seriesDataOrdersYear = data.ordersByYear.map(
        (item) => item.total,
    );

    return (
        <>
            <div>
                <div>
                    Wszyscy <TextTicker value={data.totalUsers} />
                </div>
                <div>
                    Aktywni <TextTicker value={data.activeUsers} />
                </div>
                <div>
                    Nieaktywni <TextTicker value={data.inactiveUsers} />
                </div>
                <div>
                    Dzisiaj nowych
                    <TextTicker value={data.newUsersToday} />
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
                        },
                    ]}
                    width={1000}
                    height={500}
                />
            </div>

            <div>
                Wszystkie ogłoszenia
                <TextTicker value={data.totalListings} />
            </div>
            <div>
                Ogłoszenia dzisiaj
                <TextTicker value={data.listingsToday} />
            </div>
            <div>Nowe ogłoszenia w ciągu ostatnich 12 miesięcy
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
                    width={1000}
                    height={500}
                />
            </div>

            <div>Ogłoszenia według roku
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
                    width={1000}
                    height={500}
                />
            </div>

            <div>
                Wszystkie zamówienia <TextTicker value={data.totalOrders} />
            </div>
            <div>
                Zamówienia dzisiaj <TextTicker value={data.ordersToday} />
            </div>

            <div>
                Zamówienia w tym miesiącu <TextTicker value={data.ordersThisMonth} />
            </div>
            <div>
                Zamówienia w tym roku <TextTicker value={data.ordersThisYear} />
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
                        },
                    ]}
                    width={1000}
                    height={500}
                />
            </div>

            <div>
                Nowe zamówienia według roku
                <BarChart
                    xAxis={[
                        {
                            id: "barCategories",
                            data: xAxisDataOrdersYear, // Month names for x-axis
                            scaleType: "band",
                        },
                    ]}
                    series={[
                        {
                            data: seriesDataOrdersYear, // Total listings per month for the bars
                        },
                    ]}
                    width={1000}
                    height={500}
                />
            </div>

            <div>Najczęściej sprzedające się kategorie</div>
            <PieChart
                series={[
                    {
                        data: seriesData,
                    },
                ]}
                width={800}
                height={400}
            />
        </>
    );
}
