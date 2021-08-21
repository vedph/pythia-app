import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythiaSearchPageComponent } from './pythia-search-page.component';

describe('PythiaSearchPageComponent', () => {
  let component: PythiaSearchPageComponent;
  let fixture: ComponentFixture<PythiaSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythiaSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythiaSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
