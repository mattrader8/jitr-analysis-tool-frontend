import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedJitrListComponent } from './declined-jitr-list.component';

describe('DeclinedJitrListComponent', () => {
  let component: DeclinedJitrListComponent;
  let fixture: ComponentFixture<DeclinedJitrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedJitrListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedJitrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
