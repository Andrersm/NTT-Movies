import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { setSearch } from 'src/app/shared/store/search.state';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  let router: Router;
  const initialState = { app: { searchTerm: '' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    router = TestBed.inject(Router);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate');
  });

  it('should dispatch setSearch action with searchTerm on searchMovies', () => {
    const testSearchTerm = 'test';
    component.searchTerm = testSearchTerm;

    component.searchMovies();

    expect(store.dispatch).toHaveBeenCalledWith(setSearch({ searchTerm: testSearchTerm }));
  });

  it('should navigate to /search on searchMovies', () => {
    component.searchMovies();
    expect(router.navigate).toHaveBeenCalledWith(['/search']);
  });
});
