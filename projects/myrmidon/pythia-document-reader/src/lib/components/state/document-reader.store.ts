import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Document, TextMapNode } from '@myrmidon/pythia-core';

export interface DocumentReaderState {
  document?: Document;
  map?: TextMapNode;
  text?: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'DocumentReader' })
export class DocumentReaderStore extends Store<DocumentReaderState> {
  constructor() {
    super({});
  }
}
