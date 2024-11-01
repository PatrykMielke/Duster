import React from 'react'
import Table from './Partials/Table'
import NavbarAdmin from './Partials/NavbarAdm'
export default function Dashboard({ products }) {
    return (
        <div>


            <NavbarAdmin />
            <Table products={products} />

        </div>
    )
}
