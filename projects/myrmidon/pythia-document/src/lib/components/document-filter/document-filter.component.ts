import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { DocumentFilter, DocumentService } from '@myrmidon/pythia-api';
import { Attribute, Corpus, DataPage, Profile, Document } from '@myrmidon/pythia-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOCUMENTS_PAGINATOR } from '../state/documents.paginator';

import { DocumentsQuery } from '../state/documents.query';
import { DocumentsService } from '../state/documents.service';
import { DocumentsState } from '../state/documents.store';

@Component({
  selector: 'pythia-document-filter',
  templateUrl: './document-filter.component.html',
  styleUrls: ['./document-filter.component.css'],
})
export class DocumentFilterComponent implements OnInit {
  @Input()
  public disabled: boolean | undefined;
  @Input()
  public sortable: boolean | undefined;

  public filter$: Observable<DocumentFilter>;
  public attributes$: Observable<string[]>;

  public corpus: FormControl;
  public author: FormControl;
  public title: FormControl;
  public source: FormControl;
  public profile: FormControl;
  public minDateValue: FormControl;
  public maxDateValue: FormControl;
  public minTimeModified: FormControl;
  public maxTimeModified: FormControl;
  public attributes: FormArray;
  public sortOrder: FormControl;
  public descending: FormControl;
  public form: FormGroup;

  constructor(
    @Inject(DOCUMENTS_PAGINATOR)
    public paginator: PaginatorPlugin<DocumentsState>,
    private _formBuilder: FormBuilder,
    query: DocumentsQuery,
    private _docsService: DocumentsService,
    private _docService: DocumentService
  ) {
    this.filter$ = query.selectFilter();
    this.attributes$ = query.selectAttributes();
    this.sortable = true;

    // form
    this.corpus = _formBuilder.control(null);
    this.author = _formBuilder.control(null);
    this.title = _formBuilder.control(null);
    this.source = _formBuilder.control(null);
    this.profile = _formBuilder.control(null);
    this.minDateValue = _formBuilder.control(null);
    this.maxDateValue = _formBuilder.control(null);
    this.minTimeModified = _formBuilder.control(null);
    this.maxTimeModified = _formBuilder.control(null);
    this.attributes = _formBuilder.array([]);
    this.sortOrder = _formBuilder.control(0);
    this.descending = _formBuilder.control(false);
    this.form = _formBuilder.group({
      corpus: this.corpus,
      author: this.author,
      title: this.title,
      source: this.source,
      profile: this.profile,
      minDateValue: this.minDateValue,
      maxDateValue: this.maxDateValue,
      minTimeModified: this.minTimeModified,
      maxTimeModified: this.maxTimeModified,
      attributes: this.attributes,
      sortOrder: this.sortOrder,
      descending: this.descending,
    });
  }

  ngOnInit(): void {
    this._docsService.loadLookup();
    this.filter$.subscribe((f) => {
      this.updateForm(f);
    });
  }

  private parseAttributes(csv?: string): Attribute[] {
    if (!csv) {
      return [];
    }
    const pairRegex = /^\s*([^=]+)=(.*)\s*/;
    return csv
      .split(',')
      .map((p) => {
        const m = pairRegex.exec(p);
        return m ? { targetId: 0, name: m[1], value: m[2] } : null;
      })
      .filter((a) => a) as Attribute[];
  }

  private updateForm(filter: DocumentFilter): void {
    this.corpus.setValue(filter.corpusId);
    this.author.setValue(filter.author);
    this.title.setValue(filter.title);
    this.source.setValue(filter.source);
    this.profile.setValue({ id: filter.profileId });
    this.minDateValue.setValue(filter.minDateValue);
    this.maxDateValue.setValue(filter.maxDateValue);
    this.minTimeModified.setValue(filter.minTimeModified);
    this.maxTimeModified.setValue(filter.maxTimeModified);
    this.sortOrder.setValue(filter.sortOrder || 0);
    this.descending.setValue(filter.descending ? true : false);

    this.attributes.reset();
    const attrs = this.parseAttributes(filter.attributes);
    for (let i = 0; i < attrs.length; i++) {
      this.attributes.push(this.getAttributeGroup(attrs[i]));
    }

    this.form.markAsPristine();
  }

  public onCorpusChange(corpus: Corpus | null): void {
    this.corpus.setValue(corpus);
  }

  public onCorpusRemoved(): void {
    this.corpus.reset();
  }

  public onProfileChange(profile: Profile | null): void {
    this.profile.setValue(profile);
  }

  public onProfileRemoved(): void {
    this.profile.reset();
  }

  //#region Attributes
  private getAttributeGroup(item?: Attribute): FormGroup {
    return this._formBuilder.group({
      name: this._formBuilder.control(item?.name, Validators.required),
      value: this._formBuilder.control(item?.value, Validators.maxLength(100)),
    });
  }

  public addAttribute(item?: Attribute): void {
    this.attributes.push(this.getAttributeGroup(item));
    this.attributes.markAsDirty();
  }

  public removeAttribute(index: number): void {
    this.attributes.removeAt(index);
    this.attributes.markAsDirty();
  }

  private getAttributes(): Attribute[] | undefined {
    const entries: Attribute[] = [];
    for (let i = 0; i < this.attributes.length; i++) {
      const g = this.attributes.at(i) as FormGroup;
      entries.push({
        targetId: 0, // not used
        name: g.controls.name.value?.trim(),
        value: g.controls.name.value?.trim(),
      });
    }
    return entries.length ? entries : undefined;
  }
  //#endregion

  private getFilter(): DocumentFilter {
    return {
      pageNumber: 1, // not used
      pageSize: 20, // not used
      corpusId: this.corpus.value,
      author: this.author.value?.trim(),
      title: this.title.value?.trim(),
      source: this.source.value?.trim(),
      profileId: this.profile.value?.id,
      minDateValue: this.minDateValue.value,
      maxDateValue: this.maxDateValue.value,
      minTimeModified: this.minTimeModified.value,
      maxTimeModified: this.maxTimeModified.value,
      attributes: this.getAttributes()
        ?.map((a) => `${a.name}=${a.value}`)
        ?.join(','),
      sortOrder: this.sortOrder.value,
      descending: this.descending.value ? true : false,
    };
  }

  public reset(): void {
    this.form.reset();
    this.apply();
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

  public apply(): void {
    if (this.form.invalid) {
      return;
    }
    const filter = this.getFilter();

    // update filter in state
    this._docsService.updateFilter(filter);

    // filter changed, clear paginator's cache
    this.paginator.clearCache();
    // update the page
    const request = this.getRequest(filter);
    this.paginator.getPage(request);

    // the new filter becomes part of paginator's metadata
    this.paginator.metadata.set('filter', filter);
  }
}
