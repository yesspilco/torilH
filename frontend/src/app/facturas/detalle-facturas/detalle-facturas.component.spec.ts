import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFacturasComponent } from './detalle-facturas.component';

describe('DetalleFacturasComponent', () => {
  let component: DetalleFacturasComponent;
  let fixture: ComponentFixture<DetalleFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleFacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
