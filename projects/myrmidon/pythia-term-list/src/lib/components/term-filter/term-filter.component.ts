import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TermFilter } from '@myrmidon/pythia-api';
import { Attribute, Corpus, Profile } from '@myrmidon/pythia-core';
import { Observable } from 'rxjs';

import { TermsQuery } from '../state/terms.query';
import { TermsService } from '../state/terms.service';

@Component({
  selector: 'pythia-term-filter',
  templateUrl: './term-filter.component.html',
  styleUrls: ['./term-filter.component.css'],
})
export class TermFilterComponent implements OnInit {
  @Input()
  public disabled: boolean | undefined;
  @Input()
  public sortable: boolean | undefined;

  public filter$: Observable<TermFilter>;
  public docAttributes$: Observable<string[]>;
  public tokAttributes$: Observable<string[]>;

  public corpus: FormControl;
  public author: FormControl;
  public title: FormControl;
  public source: FormControl;
  public profile: FormControl;
  public minDateValue: FormControl;
  public maxDateValue: FormControl;
  public minTimeModified: FormControl;
  public maxTimeModified: FormControl;
  public docAttributes: FormArray;
  public tokAttributes: FormArray;
  public valuePattern: FormControl;
  public minCount: FormControl;
  public maxCount: FormControl;
  public sortOrder: FormControl;
  public descending: FormControl;
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    query: TermsQuery,
    private _termsService: TermsService
  ) {
    this.filter$ = query.selectFilter();
    this.docAttributes$ = query.selectDocAttributes();
    this.tokAttributes$ = query.selectTokAttributes();
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
    this.docAttributes = _formBuilder.array([]);
    this.tokAttributes = _formBuilder.array([]);
    this.valuePattern = _formBuilder.control(null);
    this.minCount = _formBuilder.control(0);
    this.maxCount = _formBuilder.control(0);
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
      docAttributes: this.docAttributes,
      tokAttributes: this.tokAttributes,
      valuePattern: this.valuePattern,
      minCount: this.minCount,
      maxCount: this.maxCount,
      sortOrder: this.sortOrder,
      descending: this.descending,
    });
  }

  ngOnInit(): void {
    this._termsService.loadLookup();
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

  private updateAttributes(csv: string | undefined, token: boolean): void {
    const attributes: FormArray = token
      ? this.tokAttributes
      : this.docAttributes;

    attributes.reset();
    const attrs = this.parseAttributes(csv);
    for (let i = 0; i < attrs.length; i++) {
      attributes.push(this.getAttributeGroup(attrs[i]));
    }
  }

  private updateForm(filter: TermFilter): void {
    this.corpus.setValue(filter.corpusId);
    this.author.setValue(filter.author);
    this.title.setValue(filter.title);
    this.source.setValue(filter.source);
    this.profile.setValue({ id: filter.profileId });
    this.minDateValue.setValue(filter.minDateValue);
    this.maxDateValue.setValue(filter.maxDateValue);
    this.minTimeModified.setValue(filter.minTimeModified);
    this.maxTimeModified.setValue(filter.maxTimeModified);
    this.valuePattern.setValue(filter.valuePattern);
    this.minCount.setValue(filter.minCount);
    this.maxCount.setValue(filter.maxCount);
    this.sortOrder.setValue(filter.sortOrder || 0);
    this.descending.setValue(filter.descending ? true : false);

    this.updateAttributes(filter.docAttributes, false);
    this.updateAttributes(filter.tokAttributes, true);

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

  public addAttribute(item: Attribute | undefined, token: boolean): void {
    const attributes: FormArray = token
      ? this.tokAttributes
      : this.docAttributes;

    attributes.push(this.getAttributeGroup(item));
    attributes.markAsDirty();
  }

  public removeAttribute(index: number, token: boolean): void {
    const attributes: FormArray = token
      ? this.tokAttributes
      : this.docAttributes;

    attributes.removeAt(index);
    attributes.markAsDirty();
  }

  private getAttributes(token: boolean): Attribute[] | undefined {
    const attributes: FormArray = token
      ? this.tokAttributes
      : this.docAttributes;

    const entries: Attribute[] = [];
    for (let i = 0; i < attributes.length; i++) {
      const g = attributes.at(i) as FormGroup;
      entries.push({
        targetId: 0, // not used
        name: g.controls.name.value?.trim(),
        value: g.controls.name.value?.trim(),
      });
    }
    return entries.length ? entries : undefined;
  }
  //#endregion

  private getFilter(): TermFilter {
    return {
      pageNumber: 1, // not used
      pageSize: 20, // not used
      corpusId: this.corpus.value?.id,
      author: this.author.value?.trim(),
      title: this.title.value?.trim(),
      source: this.source.value?.trim(),
      profileId: this.profile.value?.id,
      minDateValue: this.minDateValue.value,
      maxDateValue: this.maxDateValue.value,
      minTimeModified: this.minTimeModified.value,
      maxTimeModified: this.maxTimeModified.value,
      docAttributes: this.getAttributes(false)
        ?.map((a) => `${a.name}=${a.value}`)
        ?.join(','),
      tokAttributes: this.getAttributes(true)
        ?.map((a) => `${a.name}=${a.value}`)
        ?.join(','),
      valuePattern: this.valuePattern.value,
      minCount: this.minCount.value,
      maxCount: this.maxCount.value,
      sortOrder: this.sortOrder.value,
      descending: this.descending.value ? true : false,
    };
  }

  public reset(): void {
    this.form.reset();
    this.apply();
  }

  public apply(): void {
    if (this.form.invalid) {
      return;
    }
    const filter = this.getFilter();

    // update filter in state
    this._termsService.updateFilter(filter);
  }
}
