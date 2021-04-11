import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLcatLevelListComponent } from './admin-lcat-level-list.component';

describe('AdminLcatLevelListComponent', () => {
  let component: AdminLcatLevelListComponent;
  let fixture: ComponentFixture<AdminLcatLevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLcatLevelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLcatLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
