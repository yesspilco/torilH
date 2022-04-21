import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteinicioComponent } from './reporteinicio.component';

describe('ReporteinicioComponent', () => {
  let component: ReporteinicioComponent;
  let fixture: ComponentFixture<ReporteinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteinicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
