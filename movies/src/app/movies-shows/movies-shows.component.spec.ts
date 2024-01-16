import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesShowsComponent } from './movies-shows.component';

describe('MoviesShowsComponent', () => {
  let component: MoviesShowsComponent;
  let fixture: ComponentFixture<MoviesShowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesShowsComponent]
    });
    fixture = TestBed.createComponent(MoviesShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
