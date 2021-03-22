import { Action } from '@ngrx/store';

export enum ERateActions {
    LoadRateByDate = '[Rates] Load Rate By Date',
    LoadRateByDateSuccess = '[Rates] Load Rate By Date Success',
    LoadRateByDateFailure = '[Rates] Load Rate By Date Failure',
    LoadCurrencyDetails = '[Rates] Load Currency Details',
    LoadCurrencyDetailsSuccess = '[Rates] Load Currency Details Success',
    LoadCurrencyDetailsFailure = '[Rates] Load Currency Details Failure',
    GetRatesByDate = '[Rates] Get Rates By Date',
    GetSelectedCurrency = '[Rates] Get Selected Currency'
}

export class LoadRateByDate implements Action {
    public readonly type = ERateActions.LoadRateByDate;
    constructor(public payload: string) { }
}

export class LoadRateByDateSuccess implements Action {
    public readonly type = ERateActions.LoadRateByDateSuccess;
    constructor(public payload: { data: any; }) { }
}

export class LoadRateByDateFailure implements Action {
    public readonly type = ERateActions.LoadRateByDateFailure;
    constructor(public payload: { error: any; }) { }
}

export class GetRatesByDate implements Action {
    public readonly type = ERateActions.GetRatesByDate;
}
export class LoadCurrencyDetails implements Action {
    public readonly type = ERateActions.LoadCurrencyDetails;
    constructor(public payload: string) { }
}

export class LoadCurrencyDetailsSuccess implements Action {
    public readonly type = ERateActions.LoadCurrencyDetailsSuccess;
    constructor(public payload: { data: any; }) { }
}

export class LoadCurrencyDetailsFailure implements Action {
    public readonly type = ERateActions.LoadCurrencyDetailsFailure;
    constructor(public payload: { error: any; }) { }
}

export class GetSelectedCurrency implements Action {
    public readonly type = ERateActions.GetSelectedCurrency;
}

export type RateActions = GetRatesByDate | GetSelectedCurrency | LoadRateByDate | LoadRateByDateSuccess | LoadRateByDateFailure |
    LoadCurrencyDetails | LoadCurrencyDetailsSuccess | LoadCurrencyDetailsFailure;