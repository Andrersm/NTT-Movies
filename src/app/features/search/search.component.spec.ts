import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { StoreModule } from '@ngrx/store';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Movie } from '../../shared/models/movie.model';
import { appReducer } from 'src/app/shared/store/search.state';

class MockFavoritesService {
  addFav(idImdb: string) {}
  rmFav(idImdb: string) {}
  getFav(): string[] { return []; }
  toggleFav(idImdb: string) {}
}

class MockMovieService {
  moviesSearched$: Observable<Movie[]> = of([{
    title: 'Test Movie',
    year: '2020',
    poster: 'test.jpg',
    imdbID: 'tt1234567',
    type: 'movie'
  }]);
  getSearchMovie(searchTerm: string) {
    this.moviesSearched$ = of([{
      title: 'Test Movie',
      year: '2020',
      poster: 'test.jpg',
      imdbID: 'tt1234567',
      type: 'movie'
    }]);
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        StoreModule.forRoot({ app: appReducer }),
        RouterTestingModule
      ],
      providers: [
        { provide: FavoritesService, useClass: MockFavoritesService },
        { provide: MovieService, useClass: MockMovieService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update moviesSearched$ on search term change', () => {
    const mockMovies: Movie[] = [{
      title: 'Test Movie',
      year: '2020',
      poster: 'test.jpg',
      imdbID: 'tt1234567',
      type: 'movie'
    }];
    spyOn(movieService, 'getSearchMovie').and.callThrough();
    component.moviesSearched$!.subscribe(data => {
      expect(data).toEqual(mockMovies);
    });

  
    movieService.getSearchMovie('test');
    expect(movieService.getSearchMovie).toHaveBeenCalledWith('test');
  });
});
