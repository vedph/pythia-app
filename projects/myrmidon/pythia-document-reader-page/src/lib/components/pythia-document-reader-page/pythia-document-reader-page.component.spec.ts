import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythiaDocumentReaderPageComponent } from './pythia-document-reader-page.component';

describe('PythiaDocumentReaderPageComponent', () => {
  let component: PythiaDocumentReaderPageComponent;
  let fixture: ComponentFixture<PythiaDocumentReaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythiaDocumentReaderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythiaDocumentReaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
