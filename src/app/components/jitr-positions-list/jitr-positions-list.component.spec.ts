import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitrPositionsListComponent } from './jitr-positions-list.component';

describe('JitrPositionsListComponent', () => {
  let component: JitrPositionsListComponent;
  let fixture: ComponentFixture<JitrPositionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitrPositionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitrPositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
