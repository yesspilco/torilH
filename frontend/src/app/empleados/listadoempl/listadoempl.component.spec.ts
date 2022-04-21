import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoemplComponent } from './listadoempl.component';

describe('ListadoemplComponent', () => {
  let component: ListadoemplComponent;
  let fixture: ComponentFixture<ListadoemplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoemplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoemplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
