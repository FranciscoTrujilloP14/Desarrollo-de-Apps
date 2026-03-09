import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  movie: Movie | undefined;
  isInMyMovies: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.movie = this.movieService.getMovieById(id);
      this.isInMyMovies = this.movieService.isInMyMovies(id);
    }
  }

  addToMyMovies() {
    if (this.movie) {
      this.movieService.addToMyMovies(this.movie.id);
      this.isInMyMovies = true;
    }
  }

  removeFromMyMovies() {
    if (this.movie) {
      this.movieService.removeFromMyMovies(this.movie.id);
      this.isInMyMovies = false;
    }
  }
}
