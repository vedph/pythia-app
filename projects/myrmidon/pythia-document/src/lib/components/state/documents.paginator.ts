import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { DocumentsQuery } from './documents.query';

// create a factory provider for the items paginator
export const ITEMS_PAGINATOR = new InjectionToken('DOCUMENTS_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const query = inject(DocumentsQuery);
    return new PaginatorPlugin(query).withControls().withRange();
  },
});
