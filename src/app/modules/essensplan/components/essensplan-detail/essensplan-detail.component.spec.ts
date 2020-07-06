import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssensplanDetailComponent } from './essensplan-detail.component';

describe('EssensplanDetailComponent', () => {
  let component: EssensplanDetailComponent;
  let fixture: ComponentFixture<EssensplanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssensplanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssensplanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
