import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaglineLeavereportComponent } from './tagline-leavereport.component';

describe('TaglineLeavereportComponent', () => {
  let component: TaglineLeavereportComponent;
  let fixture: ComponentFixture<TaglineLeavereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaglineLeavereportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaglineLeavereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
