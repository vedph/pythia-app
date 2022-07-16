import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';

import { ProfileService } from '@myrmidon/pythia-api';
import { Profile } from '@myrmidon/pythia-core';

@Component({
  selector: 'pythia-lookup-profile',
  templateUrl: './lookup-profile.component.html',
  styleUrls: ['./lookup-profile.component.css'],
})
export class LookupProfileComponent implements OnInit {
  @Input()
  public label: string | undefined;
  @Input()
  public limit: number;

  @Output()
  public itemChange: EventEmitter<Profile | null>;

  public form: FormGroup;
  public lookup: FormControl;
  public items$: Observable<Profile[]>;
  public item: Profile | undefined;

  constructor(
    formBuilder: FormBuilder,
    private _profileService: ProfileService
  ) {
    // events
    this.itemChange = new EventEmitter<Profile | null>();
    // form
    this.lookup = formBuilder.control(null);
    this.form = formBuilder.group({
      lookup: this.lookup,
    });
    this.limit = 10;

    this.items$ = this.lookup.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: Profile | string) => {
        if (typeof value === 'string') {
          return this._profileService
            .getProfiles({
              pageNumber: 1,
              pageSize: this.limit || 10,
              id: value,
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

  public getLookupName(item: Profile): string {
    return item?.id;
  }

  public clear(): void {
    this.item = undefined;
    this.lookup.setValue(null);
    this.itemChange.emit(null);
  }

  public pickItem(item: Profile): void {
    this.item = item;
    this.itemChange.emit(item);
  }
}
