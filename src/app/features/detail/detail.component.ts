import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../../shared/models/movie.model';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  constructor(private movieService: MovieService, private route : ActivatedRoute) { }
  movie: MovieDetails | null = null;

  ngOnInit() {
    const imdbID = this.route.snapshot.paramMap.get('imdbID');
    this.movieService.getMovieDetail(imdbID).subscribe((movieDetail: MovieDetails | null) => {
      this.movie = movieDetail;
    });
  }
}
