import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionListComponent } from './admin-position-list.component';

describe('AdminPositionListComponent', () => {
  let component: AdminPositionListComponent;
  let fixture: ComponentFixture<AdminPositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPositionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
