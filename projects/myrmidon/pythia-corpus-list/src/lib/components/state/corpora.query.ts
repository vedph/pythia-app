import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CorpusFilter } from '@myrmidon/pythia-api';
import { Observable } from 'rxjs';
import { CorporaStore, CorporaState } from './corpora.store';

@Injectable({ providedIn: 'root' })
export class CorporaQuery extends QueryEntity<CorporaState> {
  constructor(protected _store: CorporaStore) {
    super(_store);
  }

  public selectFilter(): Observable<CorpusFilter> {
    return this.select((state: CorporaState) => state.filter);
  }
}
