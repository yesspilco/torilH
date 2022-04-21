import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmpleadosComponent } from './login-empleados.component';

describe('LoginEmpleadosComponent', () => {
  let component: LoginEmpleadosComponent;
  let fixture: ComponentFixture<LoginEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
