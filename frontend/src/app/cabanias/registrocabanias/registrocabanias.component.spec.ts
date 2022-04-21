import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrocabaniasComponent } from './registrocabanias.component';

describe('RegistrocabaniasComponent', () => {
  let component: RegistrocabaniasComponent;
  let fixture: ComponentFixture<RegistrocabaniasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrocabaniasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrocabaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
