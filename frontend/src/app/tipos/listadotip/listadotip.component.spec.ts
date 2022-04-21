import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadotipComponent } from './listadotip.component';

describe('ListadotipComponent', () => {
  let component: ListadotipComponent;
  let fixture: ComponentFixture<ListadotipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadotipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadotipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
