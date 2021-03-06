import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';

import { TermFilter, TermService } from '@myrmidon/pythia-api';
import { TERMS_PAGINATOR } from '../state/terms.paginator';
import { TermsState } from '../state/terms.store';
import { TermsQuery } from '../state/terms.query';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { IndexTerm } from '@myrmidon/pythia-core';
import { PageEvent } from '@angular/material/paginator';
import { DataPage } from '@myrmidon/ng-tools';

@Component({
  selector: 'pythia-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.css'],
})
export class TermListComponent {
  private _refresh$: BehaviorSubject<number>;
  private _filter$: Observable<TermFilter>;

  public pagination$: Observable<PaginationResponse<IndexTerm>>;
  public pageSize: FormControl<number>;

  @Output()
  public searchRequest: EventEmitter<string>;

  constructor(
    @Inject(TERMS_PAGINATOR)
    public paginator: PaginatorPlugin<TermsState>,
    private _termService: TermService,
    termsQuery: TermsQuery,
    formBuilder: FormBuilder
  ) {
    this.searchRequest = new EventEmitter<string>();
    this.pageSize = formBuilder.control(20, { nonNullable: true });
    this._refresh$ = new BehaviorSubject(0);
    this._filter$ = termsQuery.selectFilter();

    this.pagination$ = combineLatest([
      this.paginator.pageChanges,
      this.pageSize.valueChanges.pipe(
        // we are required to emit at least the initial value
        // as combineLatest emits only if ALL observables have emitted
        startWith(20),
        // clear the cache when page size changes
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
      this._filter$.pipe(
        // clear the cache when filters changed
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
      this._refresh$.pipe(
        // clear the cache when forcing refresh
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
    ]).pipe(
      // for each emitted value, combine into a filter and use it
      // to request the page from server
      switchMap(([pageNumber, pageSize, filter, refresh]) => {
        // const filter = { ...this._docsQuery.getValue().filter };
        const f = { ...filter };
        f.pageNumber = pageNumber;
        f.pageSize = pageSize;
        const request = this.getRequest(f);
        // update saved filters
        this.paginator.metadata.set('filter', f);
        return this.paginator.getPage(request);
      })
    );
  }

  private getRequest(
    filter: TermFilter
  ): () => Observable<PaginationResponse<IndexTerm>> {
    return () =>
      this._termService.getTerms(filter).pipe(
        // adapt server results to the paginator plugin
        map((p: DataPage<IndexTerm>) => {
          return {
            currentPage: p.pageNumber,
            perPage: p.pageSize,
            lastPage: p.pageCount,
            data: p.items,
            total: p.total,
          };
        })
      );
  }

  public pageChange(event: PageEvent): void {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    if (event.pageSize !== this.pageSize.value) {
      this.pageSize.setValue(event.pageSize);
    }
  }

  public refresh(): void {
    this._refresh$.next(this._refresh$.value + 1);
  }

  public requestSearch(term: string): void {
    this.searchRequest.emit(term);
  }
}
