export interface IRateState {
    currencies: string[];
    data: any;
    selectedCurrency: string;
}

export const initialRateState: IRateState = {
    currencies: ['USD', 'EUR'],
    data: {
        'USD': [{
            date: "2020-12-11T22:00:00.000Z",
            purchase_privat: 27.9,
            rate_nb: 28.075,
            sale_privat: 28.33
        },
        {
            date: "2020-12-12T22:00:00.000Z",
            purchase_privat: 27.9,
            rate_nb: 28.075,
            sale_privat: 28.33,
        },
        {
            date: "2020-12-13T22:00:00.000Z",
            purchase_privat: 27.8,
            rate_nb: 28.085,
            sale_privat: 28.23,
        }],
        'EUR': [{
            date: "2020-12-11T22:00:00.000Z",
            purchase_privat: 37.9,
            rate_nb: 38.075,
            sale_privat: 38.33
        },
        {
            date: "2020-12-12T22:00:00.000Z",
            purchase_privat: 37.9,
            rate_nb: 38.075,
            sale_privat: 38.33,
        },
        {
            date: "2020-12-13T22:00:00.000Z",
            purchase_privat: 37.8,
            rate_nb: 38.085,
            sale_privat: 38.23,
        }],
    },
    selectedCurrency: null
};