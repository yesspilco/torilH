import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosHosteriaComponent } from './datos-hosteria.component';

describe('DatosHosteriaComponent', () => {
  let component: DatosHosteriaComponent;
  let fixture: ComponentFixture<DatosHosteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosHosteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosHosteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
