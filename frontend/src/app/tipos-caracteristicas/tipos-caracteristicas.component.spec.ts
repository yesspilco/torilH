import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCaracteristicasComponent } from './tipos-caracteristicas.component';

describe('TiposCaracteristicasComponent', () => {
  let component: TiposCaracteristicasComponent;
  let fixture: ComponentFixture<TiposCaracteristicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposCaracteristicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
