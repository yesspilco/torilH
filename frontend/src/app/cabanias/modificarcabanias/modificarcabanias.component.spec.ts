import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarcabaniasComponent } from './modificarcabanias.component';

describe('ModificarcabaniasComponent', () => {
  let component: ModificarcabaniasComponent;
  let fixture: ComponentFixture<ModificarcabaniasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarcabaniasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarcabaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
