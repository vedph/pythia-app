import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Document } from '@myrmidon/pythia-core';
import { KwicSearchResult } from '@myrmidon/pythia-api';

export interface KwicSearchResultEntity extends KwicSearchResult {
  // ID for local store entities, built from document ID and position
  id: string;
}

export interface SearchState
  extends EntityState<KwicSearchResultEntity, string> {
  pageNumber: number;
  pageSize: number;
  query?: string;
  queryHistory: string[];
  error?: string;
}

const initialState: SearchState = {
  pageNumber: 1,
  pageSize: 20,
  queryHistory: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Search' })
export class SearchStore extends EntityStore<SearchState> {
  constructor() {
    super(initialState);
  }
}
