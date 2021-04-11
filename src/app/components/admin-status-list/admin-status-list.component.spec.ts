import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusListComponent } from './admin-status-list.component';

describe('AdminStatusListComponent', () => {
  let component: AdminStatusListComponent;
  let fixture: ComponentFixture<AdminStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
