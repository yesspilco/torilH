import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOtrosServiciosComponent } from './listar-otros-servicios.component';

describe('ListarOtrosServiciosComponent', () => {
  let component: ListarOtrosServiciosComponent;
  let fixture: ComponentFixture<ListarOtrosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarOtrosServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOtrosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
