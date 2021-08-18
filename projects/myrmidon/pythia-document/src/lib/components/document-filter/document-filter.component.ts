import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DocumentFilter } from '@myrmidon/pythia-api';
import { Corpus, Profile } from '@myrmidon/pythia-core';
import { Observable } from 'rxjs';

import { DocumentsQuery } from '../state/documents.query';
import { DocumentsService } from '../state/documents.service';

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
    formBuilder: FormBuilder,
    query: DocumentsQuery,
    private _docsService: DocumentsService
  ) {
    this.filter$ = query.selectFilter();
    this.attributes$ = query.selectAttributes();
    this.sortable = true;

    // form
    this.corpus = formBuilder.control(null);
    this.author = formBuilder.control(null);
    this.title = formBuilder.control(null);
    this.source = formBuilder.control(null);
    this.profile = formBuilder.control(null);
    this.minDateValue = formBuilder.control(null);
    this.maxDateValue = formBuilder.control(null);
    this.minTimeModified = formBuilder.control(null);
    this.maxTimeModified = formBuilder.control(null);
    this.attributes = formBuilder.array([]);
    this.sortOrder = formBuilder.control(0);
    this.descending = formBuilder.control(false);
    this.form = formBuilder.group({
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
    this._docsService.updateLookup();
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

  public reset(): void {
    this.form.reset();
    // TODO
  }

  public apply(): void {
    // TODO
  }
}
