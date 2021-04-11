import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRatingListComponent } from './admin-rating-list.component';

describe('AdminRatingListComponent', () => {
  let component: AdminRatingListComponent;
  let fixture: ComponentFixture<AdminRatingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRatingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
