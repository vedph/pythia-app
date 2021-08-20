import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TermFilter } from '@myrmidon/pythia-api';
import { Observable } from 'rxjs';
import { TermsStore, TermsState } from './terms.store';

@Injectable({ providedIn: 'root' })
export class TermsQuery extends QueryEntity<TermsState> {
  constructor(protected _store: TermsStore) {
    super(_store);
  }

  public selectFilter(): Observable<TermFilter> {
    return this.select((state: TermsState) => state.filter);
  }

  public selectDocAttributes(): Observable<string[]> {
    return this.select((state: TermsState) => state.docAttributes);
  }

  public selectTokAttributes(): Observable<string[]> {
    return this.select((state: TermsState) => state.tokAttributes);
  }
}
