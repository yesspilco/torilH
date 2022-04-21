import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHosteriaComponent } from './modificar-hosteria.component';

describe('ModificarHosteriaComponent', () => {
  let component: ModificarHosteriaComponent;
  let fixture: ComponentFixture<ModificarHosteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarHosteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarHosteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
