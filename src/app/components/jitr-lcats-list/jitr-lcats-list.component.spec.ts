import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitrLcatsListComponent } from './jitr-lcats-list.component';

describe('JitrLcatsListComponent', () => {
  let component: JitrLcatsListComponent;
  let fixture: ComponentFixture<JitrLcatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitrLcatsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitrLcatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
