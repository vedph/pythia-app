import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';

import { CorpusFilter, CorpusService } from '@myrmidon/pythia-api';
import { Corpus } from '@myrmidon/pythia-core';

import { CorporaState } from '../state/corpora.store';
import { CorporaQuery } from '../state/corpora.query';
import { CORPORA_PAGINATOR } from '../state/corpora.paginator';
import { EditedCorpus } from '../corpus-editor/corpus-editor.component';
import { DialogService } from '@myrmidon/pythia-ui';
import { DataPage } from '@myrmidon/ng-tools';

@Component({
  selector: 'pythia-corpus-list',
  templateUrl: './corpus-list.component.html',
  styleUrls: ['./corpus-list.component.css'],
})
export class CorpusListComponent implements OnDestroy {
  private _refresh$: BehaviorSubject<number>;
  private _filter$: Observable<CorpusFilter>;

  public pagination$: Observable<PaginationResponse<Corpus>>;
  public pageSize: FormControl<number>;
  public editedCorpus: Corpus | undefined;

  constructor(
    @Inject(CORPORA_PAGINATOR)
    public paginator: PaginatorPlugin<CorporaState>,
    corporaQuery: CorporaQuery,
    private _corpusService: CorpusService,
    private _dialogService: DialogService,
    formBuilder: FormBuilder
  ) {
    this.pageSize = formBuilder.control(20, { nonNullable: true });
    this._refresh$ = new BehaviorSubject(0);
    this._filter$ = corporaQuery.selectFilter();

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

  ngOnDestroy(): void {
    this.paginator.destroy();
  }

  private getRequest(
    filter: CorpusFilter
  ): () => Observable<PaginationResponse<Corpus>> {
    return () =>
      this._corpusService.getCorpora(filter).pipe(
        // adapt server results to the paginator plugin
        map((p: DataPage<Corpus>) => {
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

  public editCorpus(corpus: Corpus): void {
    this.editedCorpus = { ...corpus };
  }

  public deleteCorpus(corpus: Corpus): void {
    this._dialogService
      .confirm('Confirm', `Delete corpus ${corpus.title}?`)
      .pipe(take(1))
      .subscribe((yes) => {
        if (!yes) {
          return;
        }
        this._corpusService
          .deleteCorpus(corpus.id)
          .pipe(take(1))
          .subscribe((_) => {
            this._refresh$.next(this._refresh$.value + 1);
          });
      });
  }

  public onCorpusChange(corpus: EditedCorpus): void {
    this._corpusService
      .addCorpus(corpus, corpus.sourceId)
      .pipe(take(1))
      .subscribe((_) => {
        this._refresh$.next(this._refresh$.value + 1);
      });
  }

  public onCorpusEditorClose(): void {
    this.editedCorpus = undefined;
  }
}
