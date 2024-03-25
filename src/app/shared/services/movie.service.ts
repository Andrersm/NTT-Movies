import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieDetails } from '../../shared/models/movie.model';
import { BehaviorSubject, Observable, catchError, forkJoin, map, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseKey = '9c5080a2';
  private URL = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient,
    private localStorageService : LocalStorageService) { }

    favoritesMovies: Movie[] = [];
    movie: MovieDetails | null = null;
    private moviesSearchedSubject = new BehaviorSubject<Movie[]>([]);
    public moviesSearched$ = this.moviesSearchedSubject.asObservable();
    
  randomTerms : string[] = ['spider','sherek', 'life', 'war', 'mario', 'persona',
    'gay', 'gun', 'car', 'need', 'kiss', 'love', 'avenger', 'rambo', 'night',
    'rocky', 'batman', 'lord', 'scar', 'avatar', 'naruto', 'thunder',
    'fire', 'revenge', 'hotel', 'scary', 'movie', 'fly', 'snake', 'saw']

  getMovieHome(): Observable<Movie[]>  {
    const randomIndex = Math.floor(Math.random() * this.randomTerms.length);
    const searchTerm = this.randomTerms[randomIndex];
    const url = `${this.URL}?apikey=${this.baseKey}&s=${encodeURIComponent(searchTerm)}`;

      return this.http.get<any>(url).pipe(
        map(response => {
          if (response.Response === 'True') {
            return response.Search.map((movie: any) => ({
              title: movie.Title,
              released: movie.Year,
              poster: movie.Poster,
              imdbID: movie.imdbID
            }));
          }
          return [];
        }),
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return of([]);
        })
      );
  }

  getFavoritesMovies(imdbID: string): Observable<Movie | null> {
    const url = `${this.URL}?i=${imdbID}&apikey=${this.baseKey}`;
  
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.Response === 'True') {
          return {
            title: response.Title,
            year: response.Year,
            poster: response.Poster,
            imdbID: response.imdbID,
            type: response.Type
          } as Movie;
        } else {
          throw new Error('Movie not found');
        }
      }),
      catchError(error => {
        console.error('Error fetching movie details:', error);
        return of(null);
      })
    );
  }

  loadFavoriteMovies(): void {
    const favoriteIds: string[] = this.getFavoriteIds(); 
    const requests = favoriteIds.map(id => this.getFavoritesMovies(id));
    forkJoin(requests).subscribe(results => {
      this.favoritesMovies = results.filter(movie => movie !== null) as Movie[];
      console.log(this.favoritesMovies); 
    });
  }

  getFavoriteIds(): string[] {
    return this.localStorageService.getItem('favoritos') || [];
  }

  getMovieDetail(imdbID: string | null): Observable<MovieDetails | null> {
    const url = `${this.URL}?i=${imdbID}&apikey=${this.baseKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.Response === 'True') {
          return {
            title: response.Title,
            genre: response.Genre,
            released: response.Released,
            poster: response.Poster,
            imdbID: response.imdbID,
            plot: response.Plot,
            director: response.Director,
            actors: response.Actors,
            metascore: response.Metascore,
            runtime: response.Runtime,
            writer: response.Writer,
          } as MovieDetails;
        } else {
          throw new Error('Movie not found');
        }
      }),
      catchError(error => {
        console.error('Error fetching movie details:', error);
        return of(null);
      })
    );
  }

  getSearchMovie(searchTerm: string, pages: number = 4): void {
    const movieObservables: Observable<any>[] = [];
  
    for (let page = 1; page <= pages; page++) {
      const pageUrl = `${this.URL}?apikey=${this.baseKey}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
      movieObservables.push(this.http.get<any>(pageUrl));
    }
  
    forkJoin(movieObservables).pipe(
      map(responses => {
        const allMovies: any[] = [];
        responses.forEach(response => {
          if (response.Response === 'True') {
            allMovies.push(...response.Search.map((movie: any) => ({
              title: movie.Title,
              released: movie.Year,
              poster: movie.Poster,
              imdbID: movie.imdbID,
            })));
          }
        });
        return allMovies;
      }),
      catchError(error => {
        console.error('Error fetching movies:', error);
        return of([]);
      })
    ).subscribe(movies => {
      console.log('Movies received:', movies); 
      this.moviesSearchedSubject.next(movies);
    });
  }
}
  
  

