import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import TextTicker from "@/Components/TextTicker";
export default function Charts(props) {
    const data = props.chartData;
    console.log(data);

    /*
    categories
    const seriesData = data.topCategories.map((category, index) => ({
        id: index,
        value: category.total_orders,
        label: category.category_name,
    })); */

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
            <div>data.listingsByMonth</div>
            <div>data.listingsByYear</div>
            <div>
                Wszystkie zamówienia
                <TextTicker value={data.totalOrders} />
            </div>
            <div>
                Zamówienia dzisiaj
                <TextTicker value={data.ordersToday} />
            </div>
            <div>data.ordersThisYear</div>
            <div>data.topCategories</div>
            {/* <PieChart
                series={[
                    {
                        data: categoryData,
                    },
                ]}
                width={400}
                height={200}
            /> */}
        </>
    );
}
