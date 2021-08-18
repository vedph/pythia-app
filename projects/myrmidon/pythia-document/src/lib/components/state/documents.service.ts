import { Injectable } from '@angular/core';
import {
  AttributeFilterType,
  AttributeService,
  DocumentFilter,
  DocumentService,
} from '@myrmidon/pythia-api';
import { take } from 'rxjs/operators';
import { DocumentsStore } from './documents.store';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  constructor(
    private _docService: DocumentService,
    private _attrService: AttributeService,
    private _store: DocumentsStore
  ) {}

  /**
   * Load lookup data in the store.
   */
  public loadLookup(): void {
    this._attrService
      .getAttributeNames({
        pageNumber: 1,
        pageSize: 0,
        type: AttributeFilterType.Document,
      })
      .pipe(take(1))
      .subscribe((names) => {
        this._store.update({
          attributes: names,
        });
      });
  }

  /**
   * Update the filter in the store.
   * @param filter The filter.
   */
  public updateFilter(filter: DocumentFilter): void {
    this._store.update({
      filter: filter
    });
  }
}
