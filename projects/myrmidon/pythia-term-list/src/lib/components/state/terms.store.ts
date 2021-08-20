import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IndexTerm } from '@myrmidon/pythia-core';
import { TermFilter } from '@myrmidon/pythia-api';

export interface TermsState extends EntityState<IndexTerm> {
  filter: TermFilter;
  docAttributes: string[];
  tokAttributes: string[];
}

const initialState : TermsState = {
  filter: {
    pageNumber: 1,
    pageSize: 20,
    sortOrder: 0
  },
  docAttributes: [],
  tokAttributes: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Terms' })
export class TermsStore extends EntityStore<TermsState> {
  constructor() {
    super(initialState);
  }
}
