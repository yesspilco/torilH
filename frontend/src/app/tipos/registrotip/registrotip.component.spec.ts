import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrotipComponent } from './registrotip.component';

describe('RegistrotipComponent', () => {
  let component: RegistrotipComponent;
  let fixture: ComponentFixture<RegistrotipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrotipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrotipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
