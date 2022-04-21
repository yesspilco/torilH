import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCabaniasComponent } from './reporte-cabanias.component';

describe('ReporteCabaniasComponent', () => {
  let component: ReporteCabaniasComponent;
  let fixture: ComponentFixture<ReporteCabaniasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCabaniasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCabaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
