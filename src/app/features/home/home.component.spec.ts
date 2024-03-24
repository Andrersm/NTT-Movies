import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MovieService } from 'src/app/shared/services/movie.service';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let movieServiceMock: any;
  let favoritesServiceMock: any;

  beforeEach(async () => {
    movieServiceMock = jasmine.createSpyObj('MovieService', ['getMovieHome']);
    movieServiceMock.getMovieHome.and.returnValue(of([{ id: '1', title: 'Test Movie' }]));

    favoritesServiceMock = jasmine.createSpyObj('FavoritesService', ['addFav', 'rmFav', 'getFav', 'toggleFav']);
    favoritesServiceMock.getFav.and.returnValue(['1', '2']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: MovieService, useValue: movieServiceMock },
        { provide: FavoritesService, useValue: favoritesServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie lists on init', () => {
    expect(movieServiceMock.getMovieHome).toHaveBeenCalledTimes(5);
    expect(component.movieLists.length).toBe(5);
  });

  it('should toggle favorite status of a movie', () => {
    const imdbId = '1';
    component.toggleFav(imdbId);
    expect(favoritesServiceMock.toggleFav).toHaveBeenCalledWith(imdbId);
  });

});
