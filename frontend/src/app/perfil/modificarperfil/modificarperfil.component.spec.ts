import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarperfilComponent } from './modificarperfil.component';

describe('ModificarperfilComponent', () => {
  let component: ModificarperfilComponent;
  let fixture: ComponentFixture<ModificarperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
