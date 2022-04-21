import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallereservacionesComponent } from './detallereservaciones.component';

describe('DetallereservacionesComponent', () => {
  let component: DetallereservacionesComponent;
  let fixture: ComponentFixture<DetallereservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallereservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallereservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
