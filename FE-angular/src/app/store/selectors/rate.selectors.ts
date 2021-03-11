import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IRateState } from '../state/rate.state';

const selectRates = (state: IAppState) => state.rates;

export const getCodes = createSelector(
    selectRates,
    (state: IRateState) => state.currencies
);

export const getData = createSelector(
    selectRates,
    (state: IRateState) => state.data
);

export const getSelected = createSelector(
    selectRates,
    (state: IRateState) => state.selectedCurrency
);