import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarcliComponent } from './modificarcli.component';

describe('ModificarcliComponent', () => {
  let component: ModificarcliComponent;
  let fixture: ComponentFixture<ModificarcliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarcliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarcliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
