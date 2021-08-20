import { Injectable } from '@angular/core';
import {
  AttributeFilterType,
  AttributeService,
  TermFilter,
} from '@myrmidon/pythia-api';
import { take } from 'rxjs/operators';
import { TermsStore } from './terms.store';

@Injectable({ providedIn: 'root' })
export class TermsService {
  constructor(
    private _attrService: AttributeService,
    private _store: TermsStore
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
      .subscribe((page) => {
        this._store.update({
          docAttributes: page.items,
        });
      });

    this._attrService
      .getAttributeNames({
        pageNumber: 1,
        pageSize: 0,
        type: AttributeFilterType.Occurrence,
      })
      .pipe(take(1))
      .subscribe((page) => {
        this._store.update({
          tokAttributes: page.items,
        });
      });
  }

  /**
   * Update the filter in the store.
   * @param filter The filter.
   */
  public updateFilter(filter: TermFilter): void {
    this._store.update({
      filter: filter,
    });
  }
}
