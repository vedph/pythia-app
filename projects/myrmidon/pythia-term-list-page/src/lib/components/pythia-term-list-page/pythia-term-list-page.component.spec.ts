import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythiaTermListPageComponent } from './pythia-term-list-page.component';

describe('PythiaTermListPageComponent', () => {
  let component: PythiaTermListPageComponent;
  let fixture: ComponentFixture<PythiaTermListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythiaTermListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythiaTermListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
