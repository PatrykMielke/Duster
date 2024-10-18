import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/Layouts/Layout";

function App() {
    const [uniqueUserCount, setUniqueUserCount] = useState(0);

    useEffect(() => {
        axios
            .get("/visits/unique-users")
            .then((response) => {
                setUniqueUserCount(response.data);
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania danych: ", error);
            });
    }, []);

    return (
        <Layout>
            <div>
                <p>
                    Liczba unikalnych użytkowników, którzy odwiedzili stronę:{" "}
                    {uniqueUserCount}
                </p>
            </div>
        </Layout>
    );
}

export default App;
