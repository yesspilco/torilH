import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosalComponent } from './registrosal.component';

describe('RegistrosalComponent', () => {
  let component: RegistrosalComponent;
  let fixture: ComponentFixture<RegistrosalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
