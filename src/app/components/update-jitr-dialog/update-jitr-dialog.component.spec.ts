import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJitrDialogComponent } from './update-jitr-dialog.component';

describe('UpdateJitrDialogComponent', () => {
  let component: UpdateJitrDialogComponent;
  let fixture: ComponentFixture<UpdateJitrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateJitrDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJitrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
