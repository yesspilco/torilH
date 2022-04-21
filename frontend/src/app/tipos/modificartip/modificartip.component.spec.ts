import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificartipComponent } from './modificartip.component';

describe('ModificartipComponent', () => {
  let component: ModificartipComponent;
  let fixture: ComponentFixture<ModificartipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificartipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificartipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
