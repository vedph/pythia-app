import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Corpus } from '@myrmidon/pythia-core';

export interface CorpusCloneRequest {
  sourceId: string;
  newId: string;
}

@Component({
  selector: 'pythia-corpus-editor',
  templateUrl: './corpus-editor.component.html',
  styleUrls: ['./corpus-editor.component.css'],
})
export class CorpusEditorComponent implements OnInit {
  private _corpus: Corpus | undefined;

  @Input()
  public get corpus(): Corpus | undefined {
    return this._corpus;
  }
  public set corpus(value: Corpus | undefined) {
    this._corpus = value;
    this.updateForm(value);
  }

  @Output()
  public corpusChange: EventEmitter<Corpus>;

  @Output()
  public corpusClone: EventEmitter<CorpusCloneRequest>;

  @Output()
  public editorClose: EventEmitter<any>;

  public id: string | undefined;
  public title: FormControl;
  public description: FormControl;
  public clone: FormControl;
  public newId: FormControl;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.corpusChange = new EventEmitter<Corpus>();
    this.corpusClone = new EventEmitter<CorpusCloneRequest>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.title = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.description = formBuilder.control(null, Validators.maxLength(1000));
    this.clone = formBuilder.control(false);
    this.newId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.form = formBuilder.group({
      title: this.title,
      description: this.description,
      clone: this.clone,
      newId: this.newId,
    });
  }

  ngOnInit(): void {}

  private updateForm(corpus: Corpus | undefined): void {
    if (!corpus) {
      this.id = undefined;
      this.form.reset();
      return;
    }
    this.id = corpus.id;
    this.title.setValue(corpus.title);
    this.description.setValue(corpus.description);
    this.clone.setValue(false);
    this.newId.reset();
    this.form.markAsPristine();
  }

  private getCorpus(): Corpus {
    return {
      id: this.clone.value ? this.newId.value : this._corpus!.id,
      title: this.title.value?.trim(),
      description: this.description.value?.trim() || '',
    };
  }

  public close(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.clone.value) {
      if (this.newId.value === this._corpus!.id) {
        return;
      }
      this.corpusClone.emit({
        sourceId: this._corpus!.id,
        newId: this.newId.value?.trim(),
      });
    } else {
      this.corpusChange.emit(this.getCorpus());
    }
  }
}
