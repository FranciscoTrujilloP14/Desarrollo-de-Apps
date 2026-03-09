import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  movies: { [key: string]: Movie[] } = {};
  myMoviesCount: number = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadCategories();
    this.updateMyMoviesCount();
  }

  loadCategories() {
    this.categories = this.movieService.getCategories();
    this.categories.forEach(category => {
      this.movies[category] = this.movieService.getMoviesByCategory(category);
    });
  }

  updateMyMoviesCount() {
    this.myMoviesCount = this.movieService.getMyMovies().length;
  }
}
