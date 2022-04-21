import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarsalonesComponent } from './modificarsalones.component';

describe('ModificarsalonesComponent', () => {
  let component: ModificarsalonesComponent;
  let fixture: ComponentFixture<ModificarsalonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarsalonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarsalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
