import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRankingComponent } from './detail-ranking.component';

describe('DetailRankingComponent', () => {
  let component: DetailRankingComponent;
  let fixture: ComponentFixture<DetailRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
