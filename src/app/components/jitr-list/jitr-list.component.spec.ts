import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitrListComponent } from './jitr-list.component';

describe('JitrListComponent', () => {
  let component: JitrListComponent;
  let fixture: ComponentFixture<JitrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitrListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
