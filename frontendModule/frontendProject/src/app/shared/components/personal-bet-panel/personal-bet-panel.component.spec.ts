import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBetPanelComponent } from './personal-bet-panel.component';

describe('PersonalBetPanelComponent', () => {
  let component: PersonalBetPanelComponent;
  let fixture: ComponentFixture<PersonalBetPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalBetPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalBetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
