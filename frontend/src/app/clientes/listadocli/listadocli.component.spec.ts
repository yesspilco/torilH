import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadocliComponent } from './listadocli.component';

describe('ListadocliComponent', () => {
  let component: ListadocliComponent;
  let fixture: ComponentFixture<ListadocliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadocliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadocliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
