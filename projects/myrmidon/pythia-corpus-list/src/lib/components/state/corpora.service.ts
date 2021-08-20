import { Injectable } from '@angular/core';
import { CorpusFilter } from '@myrmidon/pythia-api';
import { CorporaStore } from './corpora.store';

@Injectable({ providedIn: 'root' })
export class CorporaService {
  constructor(private _store: CorporaStore) {}

  /**
   * Update the filter in the store.
   * @param filter The filter.
   */
  public updateFilter(filter: CorpusFilter): void {
    this._store.update({
      filter: filter,
    });
  }
}
