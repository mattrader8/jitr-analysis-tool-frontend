import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitrDetailsPositionsListComponent } from './jitr-details-positions-list.component';

describe('JitrDetailsPositionsListComponent', () => {
  let component: JitrDetailsPositionsListComponent;
  let fixture: ComponentFixture<JitrDetailsPositionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitrDetailsPositionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitrDetailsPositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
