import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJitrPositionDialogComponent } from './add-jitr-position-dialog.component';

describe('AddJitrPositionDialogComponent', () => {
  let component: AddJitrPositionDialogComponent;
  let fixture: ComponentFixture<AddJitrPositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJitrPositionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJitrPositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
