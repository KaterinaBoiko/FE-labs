import React, { Component } from 'react';
import dateFormat from 'dateformat';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            date: props.date
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.setState({
                date: this.props.date,
                isLoaded: false
            },
                () => {
                    this.getRateByDate();
                });
        }
    }

    getRateByDate() {
        fetch('http://localhost:3000/rate/' + dateFormat(this.state.date, 'dd.mm.yyyy'))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result.filter(row => row.currency)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    componentDidMount() {
        this.getRateByDate();
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div className="loading">Loading...</div>;
        }

        const columns = [
            { field: 'currency', header: 'Currency' },
            { field: 'saleRateNB', header: 'NBU Rate' },
            { field: 'purchaseRate', header: 'Purchase Privat' },
            { field: 'saleRate', header: 'Sale Privat' }
        ];


        const dynamicColumns = columns.map((col, i) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });

        return (
            <>
                <DataTable value={data}>
                    {dynamicColumns}
                </DataTable>
            </>
        );
    }
}

export default Table;