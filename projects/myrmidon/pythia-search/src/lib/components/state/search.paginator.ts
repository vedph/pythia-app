import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { SearchQuery } from './search.query';

// create a factory provider for the paginator
export const SEARCH_PAGINATOR = new InjectionToken('SEARCH_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const query = inject(SearchQuery);
    return new PaginatorPlugin(query).withControls().withRange();
  },
});
