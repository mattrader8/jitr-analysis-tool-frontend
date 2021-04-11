import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLcatListComponent } from './admin-lcat-list.component';

describe('AdminLcatListComponent', () => {
  let component: AdminLcatListComponent;
  let fixture: ComponentFixture<AdminLcatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLcatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLcatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
