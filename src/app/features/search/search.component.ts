import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { Movie } from '../../shared/models/movie.model';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { IappState } from 'src/app/shared/store/search.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  moviesSearched$: Observable<Movie[]> | undefined;

  constructor(private favoriresserive: FavoritesService,
    private movieService: MovieService,
    private store: Store<{ app: IappState }>) {}

  ngOnInit(): void {
    this.store.select('app').pipe(
      map(state => state.searchTerm),
      tap(searchTerm => {
        if (searchTerm) {
          this.movieService.getSearchMovie(searchTerm);
        }
      })
    ).subscribe();
    this.moviesSearched$ = this.movieService.moviesSearched$;
  }

  addFav(idImdb: string): void {
    this.favoriresserive.addFav(idImdb)
  }

  rmFav(idImdb: string): void {
    this.favoriresserive.rmFav(idImdb)
  }

  getFav(): string[] {
    return this.favoriresserive.getFav();
  }

  isFav(idImdb: string): boolean {
    const favoritos = this.getFav();
    return favoritos.includes(idImdb);
  }

  toggleFav(idImdb: string): void {
  this.favoriresserive.toggleFav(idImdb)
  }
}
