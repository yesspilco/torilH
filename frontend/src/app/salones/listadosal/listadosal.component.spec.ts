import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosalComponent } from './listadosal.component';

describe('ListadosalComponent', () => {
  let component: ListadosalComponent;
  let fixture: ComponentFixture<ListadosalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadosalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadosalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
