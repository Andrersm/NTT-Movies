import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { MovieService } from 'src/app/shared/services/movie.service';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let movieServiceMock: any;

  beforeEach(async () => {
    // Criando o mock do MovieService
    movieServiceMock = jasmine.createSpyObj('MovieService', ['loadFavoriteMovies']);
    movieServiceMock.favoritesMovies = [
      { title: 'Movie 1', imdbID: 'id1', poster: 'url1' },
      { title: 'Movie 2', imdbID: 'id2', poster: 'url2' },
    ];

    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorite movies on init', () => {
    expect(movieServiceMock.loadFavoriteMovies).toHaveBeenCalledTimes(1);
  });

  it('moviesDetails should return the expected favorite movies', () => {
    expect(component.moviesDetails).toEqual(movieServiceMock.favoritesMovies);
  });
});