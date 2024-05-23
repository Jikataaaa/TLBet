import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchProccessComponent } from './match-proccess.component';

describe('MatchProccessComponent', () => {
  let component: MatchProccessComponent;
  let fixture: ComponentFixture<MatchProccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchProccessComponent]
    });
    fixture = TestBed.createComponent(MatchProccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
