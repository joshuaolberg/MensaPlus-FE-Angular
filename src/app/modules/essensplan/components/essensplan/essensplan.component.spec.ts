import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssensplanComponent } from './essensplan.component';

describe('EssensplanComponent', () => {
  let component: EssensplanComponent;
  let fixture: ComponentFixture<EssensplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssensplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssensplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
