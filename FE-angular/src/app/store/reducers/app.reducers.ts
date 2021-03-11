import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { rateReducers } from "./rate.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    rates: rateReducers
};