import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssenDetailComponent } from './essen-detail.component';

describe('EssenDetailComponent', () => {
  let component: EssenDetailComponent;
  let fixture: ComponentFixture<EssenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
