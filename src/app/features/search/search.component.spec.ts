import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SearchComponent } from './search.component';
import { MovieService } from 'src/app/shared/services/movie.service';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { IappState, appReducer } from 'src/app/shared/store/search.state';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: Store<{ app: IappState }>;
  let movieServiceMock: any;
  let favoritesServiceMock: any;

  beforeEach(async () => {
    movieServiceMock = jasmine.createSpyObj('MovieService', ['getSearchMovie']);
    favoritesServiceMock = jasmine.createSpyObj('FavoritesService', ['addFav', 'rmFav', 'getFav', 'toggleFav']);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        StoreModule.forRoot({ app: appReducer }),
      ],
      providers: [
        { provide: MovieService, useValue: movieServiceMock },
        { provide: FavoritesService, useValue: favoritesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should subscribe to search term changes and fetch movies on init', (done) => {
    const testSearchTerm = 'Test';
    const expectedAction = {
      type: '[Search Component] Search',
      searchTerm: testSearchTerm
    };

    store.dispatch(expectedAction); 

    fixture.detectChanges(); 

    fixture.whenStable().then(() => {
      expect(movieServiceMock.getSearchMovie).toHaveBeenCalledWith(testSearchTerm);
      done();
    });
  });
});
