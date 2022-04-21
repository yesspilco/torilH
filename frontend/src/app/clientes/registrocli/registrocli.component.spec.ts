import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrocliComponent } from './registrocli.component';

describe('RegistrocliComponent', () => {
  let component: RegistrocliComponent;
  let fixture: ComponentFixture<RegistrocliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrocliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrocliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
