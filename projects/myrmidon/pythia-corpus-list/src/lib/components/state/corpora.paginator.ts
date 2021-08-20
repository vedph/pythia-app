import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { CorporaQuery } from './corpora.query';

// create a factory provider for the paginator
export const CORPORA_PAGINATOR = new InjectionToken('CORPORA_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const query = inject(CorporaQuery);
    return new PaginatorPlugin(query).withControls().withRange();
  },
});
