import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisreservacionesComponent } from './misreservaciones.component';

describe('MisreservacionesComponent', () => {
  let component: MisreservacionesComponent;
  let fixture: ComponentFixture<MisreservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisreservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisreservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
