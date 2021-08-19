import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { DocumentFilter, DocumentService } from '@myrmidon/pythia-api';
import { DataPage, Document } from '@myrmidon/pythia-core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { DOCUMENTS_PAGINATOR } from '../state/documents.paginator';
import { DocumentsQuery } from '../state/documents.query';
import { DocumentsState } from '../state/documents.store';

@Component({
  selector: 'pythia-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  private _refresh$: BehaviorSubject<number>;
  private _filter$: Observable<DocumentFilter>;
  public pagination$: Observable<PaginationResponse<Document>>;
  public pageSize: FormControl;

  constructor(
    @Inject(DOCUMENTS_PAGINATOR)
    public paginator: PaginatorPlugin<DocumentsState>,
    private _docService: DocumentService,
    private _docsQuery: DocumentsQuery,
    formBuilder: FormBuilder
  ) {
    this.pageSize = formBuilder.control(20);
    this._refresh$ = new BehaviorSubject(0);
    this._filter$ = _docsQuery.selectFilter();

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
    filter: DocumentFilter
  ): () => Observable<PaginationResponse<Document>> {
    return () =>
      this._docService.getDocuments(filter).pipe(
        // adapt server results to the paginator plugin
        map((p: DataPage<Document>) => {
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

  public pageChanged(event: PageEvent): void {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    if (event.pageSize !== this.pageSize.value) {
      this.pageSize.setValue(event.pageSize);
    }
  }

  ngOnInit(): void {}

  public refresh(): void {
    this._refresh$.next(this._refresh$.value + 1);
  }
}
