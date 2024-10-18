import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './LayoutTestowy';

function App({ uniqueUserCount }) {





    return (
        <Layout>
            <div>
                <p>Liczba unikalnych użytkowników, którzy odwiedzili stronę: {uniqueUserCount}</p>
            </div>
        </Layout>
    );
}

export default App;
