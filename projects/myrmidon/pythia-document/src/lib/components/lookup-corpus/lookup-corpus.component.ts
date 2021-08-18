import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CorpusService } from '@myrmidon/pythia-api';
import { Corpus } from '@myrmidon/pythia-core';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'pythia-lookup-corpus',
  templateUrl: './lookup-corpus.component.html',
  styleUrls: ['./lookup-corpus.component.css'],
})
export class LookupCorpusComponent implements OnInit {
  @Input()
  public label: string | undefined;
  @Input()
  public limit: number;

  @Output()
  public itemChange: EventEmitter<Corpus | null>;

  public form: FormGroup;
  public lookup: FormControl;
  public items$: Observable<Corpus[]>;
  public item: Corpus | undefined;

  constructor(formBuilder: FormBuilder, private _corpusService: CorpusService) {
    // events
    this.itemChange = new EventEmitter<Corpus | null>();
    // form
    this.lookup = formBuilder.control(null);
    this.form = formBuilder.group({
      lookup: this.lookup,
    });
    this.limit = 10;

    this.items$ = this.lookup.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: Corpus | string) => {
        if (typeof value === 'string') {
          return this._corpusService
            .getCorpora({
              pageNumber: 1,
              pageSize: this.limit || 10,
              title: value,
            })
            .pipe(
              map((page) => {
                return page.items;
              })
            );
        } else {
          return of([value]);
        }
      })
    );
  }

  ngOnInit(): void {}

  public getLookupName(item: Corpus): string {
    return item?.title;
  }

  public clear(): void {
    this.item = undefined;
    this.lookup.setValue(null);
    this.itemChange.emit(null);
  }

  public pickItem(item: Corpus): void {
    this.item = item;
    this.itemChange.emit(item);
  }
}
