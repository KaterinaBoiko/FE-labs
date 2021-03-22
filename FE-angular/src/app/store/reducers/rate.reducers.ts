import { ERateActions, RateActions } from '../actions/rate.actions';
import { initialRateState, IRateState } from '../state/rate.state';

export const rateReducers = (
    state = initialRateState,
    action: RateActions
): IRateState => {
    switch (action.type) {
        case ERateActions.LoadRateByDate: {
            return {
                ...state,
                selectedDate: action.payload,
                loadingRate: true,
                errorGettingRate: null
            };
        }
        case ERateActions.LoadRateByDateSuccess: {
            return {
                ...state,
                loadingRate: false,
                rateBySelectedDate: action.payload.data
            };
        }
        case ERateActions.LoadRateByDateFailure: {
            return {
                ...state,
                loadingRate: false,
                errorGettingRate: action.payload.error
            };
        }
        case ERateActions.GetRatesByDate: {
            return {
                ...state
            };
        }
        case ERateActions.LoadCurrencyDetails: {
            return {
                ...state,
                selectedCurrencyCode: action.payload,
                loadingDetails: true,
                errorGettingDetails: null
            };
        }
        case ERateActions.LoadCurrencyDetailsSuccess: {
            return {
                ...state,
                loadingDetails: false,
                currencyDetails: action.payload.data
            };
        }
        case ERateActions.LoadCurrencyDetailsFailure: {
            return {
                ...state,
                loadingDetails: false,
                errorGettingDetails: action.payload.error
            };
        }
        case ERateActions.GetSelectedCurrency: {
            return {
                ...state
            };
        }
        default:
            return state;
    }
};