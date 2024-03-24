import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.movieService.loadFavoriteMovies();
  }

  get moviesDetails() {
    return this.movieService.favoritesMovies;
  }

}
