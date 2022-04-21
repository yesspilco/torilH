import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarsalonesComponent } from './reservarsalones.component';

describe('ReservarsalonesComponent', () => {
  let component: ReservarsalonesComponent;
  let fixture: ComponentFixture<ReservarsalonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservarsalonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservarsalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
