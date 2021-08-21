import { Injectable } from '@angular/core';
import {
  AttributeFilterType,
  AttributeService,
  DocumentFilter,
} from '@myrmidon/pythia-api';
import { take } from 'rxjs/operators';
import { SearchStore } from './search.store';

@Injectable({ providedIn: 'root' })
export class SearchStateService {
  constructor(private _store: SearchStore) {}

  /**
   * Update the page number in the store.
   * @param n The page number.
   */
  public updatePageNumber(n: number): void {
    this._store.update({
      pageNumber: n,
    });
  }

  /**
   * Update the page size in the store.
   * @param n The page size.
   */
  public updatePageSize(n: number): void {
    this._store.update({
      pageSize: n,
    });
  }

  /**
   * Update the query.
   * @param query The query.
   */
  public updateQuery(query: string | undefined): void {
    this._store.update({
      query: query,
    });
  }

  /**
   * Update the error message.
   * @param error The error.
   */
  public updateError(error: string | undefined): void {
    this._store.update({
      error: error,
    });
  }
}
