import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    private readonly context =  {
        headers: {
            'vendure-token': 'default-channel',
        },
    };

    constructor(private apollo: Apollo) { }

    query<T = any>(query: DocumentNode, variables?: any): Observable<T> {
        return this.apollo.watchQuery<T>({
            query,
            variables,
            context: this.context,
        }).valueChanges.pipe(map(response => response.data));
    }

    mutate<T = any>(mutation: DocumentNode, variables?: any): Observable<T> {
        return this.apollo.mutate<T>({
            mutation,
            variables,
            context: this.context,
        }).pipe(map(response => response.data as T));
    }
}
