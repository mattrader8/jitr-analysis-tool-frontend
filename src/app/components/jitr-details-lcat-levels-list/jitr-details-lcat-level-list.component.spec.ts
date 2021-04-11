import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitrDetailsLcatLevelListComponent } from './jitr-details-lcat-level-list.component';

describe('JitrDetailsLcatLevelListComponent', () => {
  let component: JitrDetailsLcatLevelListComponent;
  let fixture: ComponentFixture<JitrDetailsLcatLevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitrDetailsLcatLevelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitrDetailsLcatLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
