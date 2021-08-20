import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Corpus } from '@myrmidon/pythia-core';
import { CorpusFilter } from '@myrmidon/pythia-api';

export interface CorporaState extends EntityState<Corpus, string> {
  filter: CorpusFilter;
}

const initialState: CorporaState = {
  filter: {
    pageNumber: 1,
    pageSize: 20,
  },
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Corpora' })
export class CorporaStore extends EntityStore<CorporaState> {
  constructor() {
    super(initialState);
  }
}
