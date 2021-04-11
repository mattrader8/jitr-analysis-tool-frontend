import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitrDetailsLcatsListComponent } from './jitr-details-lcats-list.component';

describe('JitrDetailsLcatsListComponent', () => {
  let component: JitrDetailsLcatsListComponent;
  let fixture: ComponentFixture<JitrDetailsLcatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitrDetailsLcatsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitrDetailsLcatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
