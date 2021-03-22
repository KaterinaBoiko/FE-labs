import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { RateService } from "../../services/rate.service";
import * as RateActions from "../actions/rate.actions";

@Injectable()
export class RateEffects {
    constructor(
        private actions: Actions,
        private rateService: RateService
    ) { }

    loadRateByDate = createEffect(
        () => this.actions.pipe(
            ofType(RateActions.ERateActions.LoadRateByDate),
            switchMap((action: any) => {
                return this.rateService.getRateByDate(action.payload).pipe(
                    map(data => new RateActions.LoadRateByDateSuccess({ data: data })),
                    catchError(error =>
                        of(new RateActions.LoadRateByDateFailure({ error: error }))
                    )
                );
            })
        )
    );
}