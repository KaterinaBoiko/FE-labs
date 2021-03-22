export interface IRateState {
    selectedDate: string;
    rateBySelectedDate: any;
    loadingRate: boolean;
    errorGettingRate: any;

    selectedCurrencyCode: string;
    currencyDetails: any;
    loadingDetails: boolean;
    errorGettingDetails: any;
}

export const initialRateState: IRateState = {
    selectedDate: '',
    rateBySelectedDate: null,
    loadingRate: false,
    errorGettingRate: null,

    selectedCurrencyCode: null,
    currencyDetails: null,
    loadingDetails: false,
    errorGettingDetails: null,
};