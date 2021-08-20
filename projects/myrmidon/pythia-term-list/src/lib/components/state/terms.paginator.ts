import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { TermsQuery } from './terms.query';

// create a factory provider for the paginator
export const TERMS_PAGINATOR = new InjectionToken('TERMS_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const query = inject(TermsQuery);
    return new PaginatorPlugin(query).withControls().withRange();
  },
});
