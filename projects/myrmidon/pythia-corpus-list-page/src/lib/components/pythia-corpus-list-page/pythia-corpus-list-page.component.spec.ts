import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythiaCorpusListPageComponent } from './pythia-corpus-list-page.component';

describe('PythiaCorpusListPageComponent', () => {
  let component: PythiaCorpusListPageComponent;
  let fixture: ComponentFixture<PythiaCorpusListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythiaCorpusListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythiaCorpusListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
