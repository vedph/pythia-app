import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupProfileComponent } from './lookup-profile.component';

describe('LookupProfileComponent', () => {
  let component: LookupProfileComponent;
  let fixture: ComponentFixture<LookupProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
