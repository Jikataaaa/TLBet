import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBetDialogComponent } from './new-bet-dialog.component';

describe('NewBetDialogComponent', () => {
  let component: NewBetDialogComponent;
  let fixture: ComponentFixture<NewBetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
