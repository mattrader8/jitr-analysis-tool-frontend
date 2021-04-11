import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJitrComponent } from './add-jitr.component';

describe('AddJitrComponent', () => {
  let component: AddJitrComponent;
  let fixture: ComponentFixture<AddJitrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJitrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJitrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
