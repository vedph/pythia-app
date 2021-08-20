import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupCorpusComponent } from './lookup-corpus.component';

describe('LookupCorpusComponent', () => {
  let component: LookupCorpusComponent;
  let fixture: ComponentFixture<LookupCorpusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupCorpusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupCorpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
