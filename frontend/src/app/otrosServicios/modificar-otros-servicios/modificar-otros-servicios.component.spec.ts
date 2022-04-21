import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOtrosServiciosComponent } from './modificar-otros-servicios.component';

describe('ModificarOtrosServiciosComponent', () => {
  let component: ModificarOtrosServiciosComponent;
  let fixture: ComponentFixture<ModificarOtrosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarOtrosServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarOtrosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
