import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CorpusFilter, CorpusService } from '@myrmidon/pythia-api';
import { Attribute, Corpus, Profile } from '@myrmidon/pythia-core';
import { Observable } from 'rxjs';
import { CorporaQuery } from '../state/corpora.query';

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
    private _corpusService: CorpusService
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

  // TODO

  ngOnInit(): void {}
}
