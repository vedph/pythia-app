import { Injectable } from '@angular/core';
import {
  AttributeFilterType,
  AttributeService,
  DocumentFilter,
} from '@myrmidon/pythia-api';
import { DocumentReadRequest } from '@myrmidon/pythia-document-reader';
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

  /**
   * Update the read request.
   * @param request The request.
   */
  public updateReadRequest(request: DocumentReadRequest | undefined): void {
    this._store.update({
      readRequest: request,
    });
  }

  /**
   * Update the loading flag. This is a property derived from EntityState.
   * @param on True to set loading on, false to set it off.
   */
  public updateLoading(on: boolean): void {
    this._store.update({
      loading: on
    });
  }
}
