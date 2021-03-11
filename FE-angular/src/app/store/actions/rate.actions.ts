import { Action } from '@ngrx/store';

export enum ERateActions {
    GetRates = '[Rates] Get Rates',
    GetSelectedCurrency = '[Rates] Get Selectes Currency'
}

export class GetRates implements Action {
    public readonly type = ERateActions.GetRates;
}

export class GetSelectedCurrency implements Action {
    public readonly type = ERateActions.GetSelectedCurrency;
    constructor(public payload: string) { }
}

export type RateActions = GetRates | GetSelectedCurrency;