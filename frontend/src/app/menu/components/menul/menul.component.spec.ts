import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenulComponent } from './menul.component';

describe('MenulComponent', () => {
  let component: MenulComponent;
  let fixture: ComponentFixture<MenulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
