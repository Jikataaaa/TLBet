import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsPickerComponent } from './goals-picker.component';

describe('GoalsPickerComponent', () => {
  let component: GoalsPickerComponent;
  let fixture: ComponentFixture<GoalsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
