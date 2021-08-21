import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DocumentReadRequest } from '@myrmidon/pythia-document-reader';
import { Observable } from 'rxjs';
import { SearchStore, SearchState } from './search.store';

@Injectable({ providedIn: 'root' })
export class SearchQuery extends QueryEntity<SearchState> {
  constructor(protected _store: SearchStore) {
    super(_store);
  }

  public selectQuery(): Observable<string | undefined> {
    return this.select((state) => state.query);
  }

  public selectQueryHistory(): Observable<string[]> {
    return this.select((state) => state.queryHistory);
  }

  public selectReadRequest(): Observable<DocumentReadRequest | undefined> {
    return this.select((state) => state.readRequest);
  }
}
