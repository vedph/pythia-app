import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TextMapNode, Document } from '@myrmidon/pythia-core';
import { Observable } from 'rxjs';
import {
  DocumentReaderState,
  DocumentReaderStore,
} from './document-reader.store';

@Injectable({ providedIn: 'root' })
export class DocumentReaderQuery extends Query<DocumentReaderState> {
  constructor(protected _store: DocumentReaderStore) {
    super(_store);
  }

  public selectDocument(): Observable<Document | undefined> {
    return this.select((state) => state.document);
  }

  public selectMap(): Observable<TextMapNode | undefined> {
    return this.select((state) => state.map);
  }

  public selectText(): Observable<string | undefined> {
    return this.select((state) => state.text);
  }
}
