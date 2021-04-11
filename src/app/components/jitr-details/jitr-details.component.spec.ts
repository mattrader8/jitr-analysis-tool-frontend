import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitrDetailsComponent } from './jitr-details.component';

describe('JitrDetailsComponent', () => {
  let component: JitrDetailsComponent;
  let fixture: ComponentFixture<JitrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitrDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
