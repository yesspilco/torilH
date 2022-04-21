import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOtrosServiciosComponent } from './registro-otros-servicios.component';

describe('RegistroOtrosServiciosComponent', () => {
  let component: RegistroOtrosServiciosComponent;
  let fixture: ComponentFixture<RegistroOtrosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroOtrosServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOtrosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
