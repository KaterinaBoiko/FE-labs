import { ActionReducerMap } from '@ngrx/store';
import * as rateAction from '../actions/rate.actions';
import { ERateActions, RateActions } from '../actions/rate.actions';
import { initialRateState, IRateState } from '../state/rate.state';

export const rateReducers = (
    state = initialRateState,
    action: RateActions
): IRateState => {
    switch (action.type) {
        case ERateActions.GetSelectedCurrency: {
            return {
                ...state,
                selectedCurrency: action.payload
            };
        }
        default:
            return state;
    }
};