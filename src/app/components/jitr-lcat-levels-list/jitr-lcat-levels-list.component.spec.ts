import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitrLcatLevelsListComponent } from './jitr-lcat-levels-list.component';

describe('JitrLcatLevelsListComponent', () => {
  let component: JitrLcatLevelsListComponent;
  let fixture: ComponentFixture<JitrLcatLevelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitrLcatLevelsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitrLcatLevelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
