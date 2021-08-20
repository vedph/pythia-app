import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CorpusFilter } from '@myrmidon/pythia-api';

import { CorporaQuery } from '../state/corpora.query';
import { CorporaService } from '../state/corpora.service';

@Component({
  selector: 'pythia-corpus-filter',
  templateUrl: './corpus-filter.component.html',
  styleUrls: ['./corpus-filter.component.css'],
})
export class CorpusFilterComponent implements OnInit {
  @Input()
  public disabled: boolean | undefined;

  public filter$: Observable<CorpusFilter>;

  public id: FormControl;
  public title: FormControl;
  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    query: CorporaQuery,
    private _corporaService: CorporaService
  ) {
    this.filter$ = query.selectFilter();

    // form
    this.id = formBuilder.control(null);
    this.title = formBuilder.control(null);
    this.form = formBuilder.group({
      id: this.id,
      title: this.title,
    });
  }

  ngOnInit(): void {
    this.filter$.subscribe((f) => {
      this.updateForm(f);
    });
  }

  private updateForm(filter: CorpusFilter): void {
    this.id.setValue(filter.id);
    this.title.setValue(filter.title);
    this.form.markAsPristine();
  }

  public reset(): void {
    this.form.reset();
    this.apply();
  }

  private getFilter(): CorpusFilter {
    return {
      pageNumber: 1, // not used
      pageSize: 20, // not used
      id: this.id.value?.trim(),
      title: this.title.value?.trim(),
    };
  }

  public apply(): void {
    if (this.form.invalid) {
      return;
    }
    const filter = this.getFilter();

    // update filter in state
    this._corporaService.updateFilter(filter);
  }
}
