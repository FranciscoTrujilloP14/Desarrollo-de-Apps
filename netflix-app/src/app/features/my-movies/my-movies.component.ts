import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';

@Component({
  selector: 'app-my-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {
  myMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMyMovies();
  }

  loadMyMovies() {
    this.myMovies = this.movieService.getMyMovies();
  }

  removeMovie(movieId: number) {
    this.movieService.removeFromMyMovies(movieId);
    this.loadMyMovies();
  }
}
