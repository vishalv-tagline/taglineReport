import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaglineReportComponent } from './tagline-report.component';

describe('TaglineReportComponent', () => {
  let component: TaglineReportComponent;
  let fixture: ComponentFixture<TaglineReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaglineReportComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaglineReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
