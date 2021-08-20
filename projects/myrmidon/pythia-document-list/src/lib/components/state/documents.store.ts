import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Document } from '@myrmidon/pythia-core';
import { DocumentFilter, DocumentSortOrder } from '@myrmidon/pythia-api';

export interface DocumentsState extends EntityState<Document, number> {
  filter: DocumentFilter;
  attributes: string[];
}

const initialState : DocumentsState = {
  filter: {
    pageNumber: 1,
    pageSize: 20,
    sortOrder: DocumentSortOrder.Default,
  },
  attributes: [],
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Documents' })
export class DocumentsStore extends EntityStore<DocumentsState> {
  constructor() {
    super(initialState);
  }
}
