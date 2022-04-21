import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaremplComponent } from './modificarempl.component';

describe('ModificaremplComponent', () => {
  let component: ModificaremplComponent;
  let fixture: ComponentFixture<ModificaremplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaremplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaremplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
