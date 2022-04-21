import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoreservacionesComponent } from './listadoreservaciones.component';

describe('ListadoreservacionesComponent', () => {
  let component: ListadoreservacionesComponent;
  let fixture: ComponentFixture<ListadoreservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoreservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoreservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
