import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroemplComponent } from './registroempl.component';

describe('RegistroemplComponent', () => {
  let component: RegistroemplComponent;
  let fixture: ComponentFixture<RegistroemplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroemplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroemplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
