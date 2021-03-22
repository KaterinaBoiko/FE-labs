import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IRateState } from '../state/rate.state';

const selectRates = (state: IAppState) => state.rates;

export const getSelectedDate = createSelector(
    selectRates,
    (state: IRateState) => state.selectedDate
);

export const getRateByDate = createSelector(
    selectRates,
    (state: IRateState) => state.rateBySelectedDate
);

export const getSelectedCurrency = createSelector(
    selectRates,
    (state: IRateState) => state.selectedCurrencyCode
);

export const getSelectedCurrencyDetails = createSelector(
    selectRates,
    (state: IRateState) => state.currencyDetails
);

export const isRatesLoading = createSelector(
    selectRates,
    (state: IRateState) => state.loadingRate
);

export const isDetailsLoading = createSelector(
    selectRates,
    (state: IRateState) => state.loadingDetails
);