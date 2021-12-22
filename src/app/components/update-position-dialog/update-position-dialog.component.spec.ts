import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePositionDialogComponent } from './update-position-dialog.component';

describe('UpdatePositionDialogComponent', () => {
  let component: UpdatePositionDialogComponent;
  let fixture: ComponentFixture<UpdatePositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePositionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
