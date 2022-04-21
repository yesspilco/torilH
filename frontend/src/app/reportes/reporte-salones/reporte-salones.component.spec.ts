import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSalonesComponent } from './reporte-salones.component';

describe('ReporteSalonesComponent', () => {
  let component: ReporteSalonesComponent;
  let fixture: ComponentFixture<ReporteSalonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteSalonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
