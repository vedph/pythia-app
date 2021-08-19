import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DocumentFilter } from '@myrmidon/pythia-api';
import { Observable } from 'rxjs';
import { DocumentsStore, DocumentsState } from './documents.store';

@Injectable({ providedIn: 'root' })
export class DocumentsQuery extends QueryEntity<DocumentsState> {
  constructor(protected _store: DocumentsStore) {
    super(_store);
  }

  public selectFilter(): Observable<DocumentFilter> {
    return this.select((state) => state.filter);
  }

  public selectAttributes(): Observable<string[]> {
    return this.select((state) => state.attributes);
  }
}
