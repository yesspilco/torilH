import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadocabaniasComponent } from './listadocabanias.component';

describe('ListadocabaniasComponent', () => {
  let component: ListadocabaniasComponent;
  let fixture: ComponentFixture<ListadocabaniasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadocabaniasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadocabaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
