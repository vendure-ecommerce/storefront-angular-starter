import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GET_ACTIVE_CUSTOMER } from '../../types/documents.graphql';
import { GetActiveCustomer } from '../../generated-types';
import { DataService } from '../data/data.service';
import { StateService } from '../state.service';

@Injectable({ providedIn: 'root' })
export class AccountGuard implements CanActivate {

    constructor(private stateService: StateService, private dataService: DataService) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.stateService.select(state => state.signedIn).pipe(
            switchMap(signedIn => {
                if (signedIn) {
                    return of(true);
                } else {
                    return this.dataService.query<GetActiveCustomer.Query>(GET_ACTIVE_CUSTOMER).pipe(
                        map(data => !!data.activeCustomer),
                    );
                }
            }),
        );
    }
}
