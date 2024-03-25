import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/models/movie.model';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService,
    private favoriresserive: FavoritesService,
    ) { 
  }

  ngOnInit(): void {
    this.loadMovieLists();
  }

  movieLists: Movie[][] = []; 

  moviePhrases: string[] = ["Melhores da Semana",
  "Lançamentos Recentes",
  "Melhores da Semana",
  "Lançamentos Recentes",
  "Clássicos Imperdíveis",
  "Em Alta no Streaming",]

  loadMovieLists(): void {
    for (let i = 0; i < 5; i++) {
      this.movieService.getMovieHome().subscribe(movies => {
        this.movieLists.push(movies); 
      });
    }
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


