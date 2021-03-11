import { IRateState, initialRateState } from "./rate.state";

export interface IAppState {
    rates: IRateState;
}

export const initialAppState: IAppState = {
    rates: initialRateState
};

export function getInitialAppState(): IAppState {
    return initialAppState;
}