import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie.service';
import { of } from 'rxjs';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let movieServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    movieServiceMock = jasmine.createSpyObj('MovieService', ['getMovieDetail']);
    movieServiceMock.getMovieDetail.and.returnValue(of({
   
      plot: 'Some plot',
      title: 'Test Movie',
      released: '2020-01-01', 
      poster: 'url_to_poster',
      imdbID: 'tt1234567',
      runtime: '120 min',
      director: 'A Director',
      writer: 'A Writer',
      actors: 'Actor 1, Actor 2',
      metascore: '77',
      genre: 'Drama',
    }));

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('tt1234567')
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ DetailComponent ],
      providers: [
        { provide: MovieService, useValue: movieServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovieDetail with correct imdbID on init', () => {
    expect(activatedRouteMock.snapshot.paramMap.get).toHaveBeenCalledWith('imdbID');
    expect(movieServiceMock.getMovieDetail).toHaveBeenCalledWith('tt1234567');
  });

  it('should set movie details correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.movie).toEqual({
    plot: 'Some plot',
    title: 'Test Movie',
    released: '2020-01-01', 
    poster: 'url_to_poster',
    imdbID: 'tt1234567',
    runtime: '120 min',
    director: 'A Director',
    writer: 'A Writer',
    actors: 'Actor 1, Actor 2',
    metascore: '77',
    genre: 'Drama',
    });
  });
});
