import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { KwicSearchResult, Search, SearchService } from '@myrmidon/pythia-api';
import { DataPage, ErrorWrapper } from '@myrmidon/ng-tools';
import { DocumentReadRequest } from '@myrmidon/pythia-document-reader';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { SearchStateService } from '../state/search-state.service';
import { SEARCH_PAGINATOR } from '../state/search.paginator';

import { SearchQuery } from '../state/search.query';
import { KwicSearchResultEntity, SearchState } from '../state/search.store';

@Component({
  selector: 'pythia-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild("queryCtl") queryElementRef: ElementRef | undefined;
  public pagination$: Observable<PaginationResponse<KwicSearchResultEntity>>;
  public query$: Observable<string | undefined>;
  public history$: Observable<string[]>;
  public loading$: Observable<boolean | undefined>;
  public readRequest$: Observable<DocumentReadRequest | undefined>;
  public pageSize: FormControl;
  public query: FormControl;
  public history: FormControl;
  public form: FormGroup;
  public busy: boolean | undefined;
  public leftContextLabels: string[];
  public rightContextLabels: string[];

  constructor(
    @Inject(SEARCH_PAGINATOR)
    public paginator: PaginatorPlugin<SearchState>,
    private _searchQuery: SearchQuery,
    private _searchStateService: SearchStateService,
    private _searchService: SearchService,
    private _snackbar: MatSnackBar,
    formBuilder: FormBuilder
  ) {
    this.pageSize = formBuilder.control(20);
    this.query = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(1000),
    ]);
    this.history = formBuilder.control([]);
    this.form = formBuilder.group({
      pageSize: this.pageSize,
      query: this.query,
      history: this.history
    });
    this.leftContextLabels = ['5', '4', '3', '2', '1'];
    this.rightContextLabels = ['1', '2', '3', '4', '5'];

    this.query$ = _searchQuery.selectQuery();
    this.history$ = _searchQuery.selectQueryHistory();
    this.loading$ = _searchQuery.selectLoading();
    this.readRequest$ = _searchQuery.selectReadRequest();

    // https://datorama.github.io/akita/docs/plugins/pagination/
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
      this.query$.pipe(
        // clear the cache when query changes
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
    ]).pipe(
      filter(([pageNumber, pageSize, query]) => {
        return (
          pageNumber > 0 &&
          pageSize > 0 &&
          query !== undefined &&
          query.length > 0
        );
      }),
      // for each emitted value, combine into a filter and use it
      // to request the page from server
      switchMap(([pageNumber, pageSize, query]) => {
        const search: Search = {
          pageNumber: pageNumber,
          pageSize: pageSize,
          query: query!,
        };
        const request = this.getRequest(search);
        // update saved filters
        this.paginator.metadata.set('search', search);
        return this.paginator.getPage(request);
      })
    );
  }

  ngOnDestroy(): void {
    this.paginator.destroy();
  }

  private getRequest(
    search: Search
  ): () => Observable<PaginationResponse<KwicSearchResultEntity>> {
    return () => {
      this.busy =true;

      return this._searchService.search(search).pipe(
        // adapt server results to the paginator plugin
        map((w: ErrorWrapper<DataPage<KwicSearchResult>>) => {
          this.busy = false;
          if (w.error) {
            this._searchStateService.updateError(w.error);
            return {
              currentPage: search.pageNumber,
              perPage: search.pageSize,
              lastPage: 0,
              data: [],
              total: 0,
            };
          }
          this._searchStateService.updateError(undefined);
          const p = w.value!;
          const entities = p.items.map((r) => {
            return {
              ...r,
              // this ID is local to the store
              id: r.documentId + '.' + r.position,
            };
          });
          return {
            currentPage: p.pageNumber,
            perPage: p.pageSize,
            lastPage: p.pageCount,
            data: entities,
            total: p.total,
          };
        })
      );
    };
  }

  public pageChange(event: PageEvent): void {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    if (event.pageSize !== this.pageSize.value) {
      this.pageSize.setValue(event.pageSize);
    }
  }

  public pickHistory(): void {
    if (!this.history.value) {
      return;
    }
    this.query.setValue(this.history.value);
    this.queryElementRef?.nativeElement.focus();
  }

  public search(): void {
    if (this.form.invalid || this.busy) {
      return;
    }
    const query = this.query.value?.trim();
    this._searchStateService.updateQuery(query);
    if (query) {
      this._searchStateService.addToHistory(query);
    }
  }

  public searchByEnter(event: KeyboardEvent): void {
    if (this.busy) {
      return;
    }
    event.stopPropagation();
    this.search();
  }

  ngOnInit(): void {}

  public readDocument(id: number) {
    this._searchStateService.updateReadRequest({
      documentId: id,
    });
  }

  public readDocumentPiece(id: number, start: number, length: number) {
    this._searchStateService.updateReadRequest({
      documentId: id,
      start: start,
      end: start + length,
    });
  }
}
