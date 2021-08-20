import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythiaDocumentListPageComponent } from './pythia-document-list-page.component';

describe('PythiaDocumentListPageComponent', () => {
  let component: PythiaDocumentListPageComponent;
  let fixture: ComponentFixture<PythiaDocumentListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythiaDocumentListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythiaDocumentListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
