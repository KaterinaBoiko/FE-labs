import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class Table extends Component {

    render() {

        const columns = [
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'price', header: 'Price' },
            { field: 'quantity', header: 'Quantity' }
        ];

        const DISHES =
            [
                {
                    id: 0,
                    name: 'Uthappizza',
                    image: '/assets/images/uthappizza.png',
                    category: 'mains',
                    label: 'Hot',
                    price: '4.99',
                    featured: true,
                    description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
                },
                {
                    id: 1,
                    name: 'Zucchipakoda',
                    image: '/assets/images/zucchipakoda.png',
                    category: 'appetizer',
                    label: '',
                    price: '1.99',
                    featured: false,
                    description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce'
                },
                {
                    id: 2,
                    name: 'Vadonut',
                    image: '/assets/images/vadonut.png',
                    category: 'appetizer',
                    label: 'New',
                    price: '1.99',
                    featured: false,
                    description: 'A quintessential ConFusion experience, is it a vada or is it a donut?'
                },
                {
                    id: 3,
                    name: 'ElaiCheese Cake',
                    image: '/assets/images/elaicheesecake.png',
                    category: 'dessert',
                    label: '',
                    price: '2.99',
                    featured: false,
                    description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms'
                }
            ];

        const dynamicColumns = columns.map((col, i) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });

        return (
            <>
                <DataTable value={DISHES}>
                    {dynamicColumns}
                </DataTable>
            </>
        );
    }
}

export default Table;