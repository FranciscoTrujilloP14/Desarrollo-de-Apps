import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      description: 'Un ladrón que especializado en la extracción de secretos del subconsciente durante el estado de sueño.',
      image: 'https://pics.filmaffinity.com/Norbit-926396579-large.jpg',
      category: 'Ciencia Ficción'
    },
    {
      id: 2,
      title: 'Interstellar',
      description: 'Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHR9z_PZXsutIC6AduJQPV1RiOKNXxaNE3LWv0TL0VY3uFeYWjTQMdaDV8BHc14e3F4TjkCRcOFHEuOvMZgLDGRKdCTYzUyawFiKcxjA&s=10',
      category: 'Ciencia Ficción'
    },
    {
      id: 3,
      title: 'The Matrix',
      description: 'Un hacker descubre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladoras.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHR9z_PZXsutIC6AduJQPV1RiOKNXxaNE3LWv0TL0VY3uFeYWjTQMdaDV8BHc14e3F4TjkCRcOFHEuOvMZgLDGRKdCTYzUyawFiKcxjA&s=10',
      category: 'Ciencia Ficción'
    },
    {
      id: 4,
      title: 'The Shawshank Redemption',
      description: 'Dos hombres encarcelados entablan una amistad durante años, encontrando consuelo y redención a través de actos de decencia común.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHR9z_PZXsutIC6AduJQPV1RiOKNXxaNE3LWv0TL0VY3uFeYWjTQMdaDV8BHc14e3F4TjkCRcOFHEuOvMZgLDGRKdCTYzUyawFiKcxjA&s=10',
      category: 'Drama'
    },
    {
      id: 5,
      title: 'Forrest Gump',
      description: 'La vida es como una caja de chocolates, nunca sabes lo que va a conseguir. Sigue la vida de un hombre de corazón puro.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHR9z_PZXsutIC6AduJQPV1RiOKNXxaNE3LWv0TL0VY3uFeYWjTQMdaDV8BHc14e3F4TjkCRcOFHEuOvMZgLDGRKdCTYzUyawFiKcxjA&s=10',
      category: 'Drama'
    },
    {
      id: 6,
      title: 'The Godfather',
      description: 'El patriarca envejecido de una dinastía criminal transfiere el control de su imperio clandestino a su hijo más joven.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHR9z_PZXsutIC6AduJQPV1RiOKNXxaNE3LWv0TL0VY3uFeYWjTQMdaDV8BHc14e3F4TjkCRcOFHEuOvMZgLDGRKdCTYzUyawFiKcxjA&s=10',
      category: 'Drama'
    },
    {
      id: 7,
      title: 'Joker',
      description: 'Un comediante con discapacidad mental es olvidado por la sociedad y se convierte en una figura de caos extremo.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHR9z_PZXsutIC6AduJQPV1RiOKNXxaNE3LWv0TL0VY3uFeYWjTQMdaDV8BHc14e3F4TjkCRcOFHEuOvMZgLDGRKdCTYzUyawFiKcxjA&s=10',
      category: 'Thriller'
    },
    {
      id: 8,
      title: 'Se7en',
      description: '2 detective persiguen un asesino en serie que usa los siete pecados capitales como móvil para sus asesinatos.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHR9z_PZXsutIC6AduJQPV1RiOKNXxaNE3LWv0TL0VY3uFeYWjTQMdaDV8BHc14e3F4TjkCRcOFHEuOvMZgLDGRKdCTYzUyawFiKcxjA&s=10',
      category: 'Thriller'
    },
    {
      id: 9,
      title: 'Parasite',
      description: 'Una familia de bajos ingresos infiltra estratégicamente una mansión de la familia rica haciendo que sus problemas oscuros salgan a la luz.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHR9z_PZXsutIC6AduJQPV1RiOKNXxaNE3LWv0TL0VY3uFeYWjTQMdaDV8BHc14e3F4TjkCRcOFHEuOvMZgLDGRKdCTYzUyawFiKcxjA&s=10',
      category: 'Thriller'
    }
  ];

  constructor() {}

  getMovies(): Movie[] {
    return this.movies;
  }

  getCategories(): string[] {
    return [...new Set(this.movies.map(m => m.category))];
  }

  getMoviesByCategory(category: string): Movie[] {
    return this.movies.filter(m => m.category === category);
  }

  getMovieById(id: number): Movie | undefined {
    return this.movies.find(m => m.id === id);
  }

  addToMyMovies(movieId: number): void {
    const myMovies = this.getMyMovies();
    if (!myMovies.find(m => m.id === movieId)) {
      const movie = this.getMovieById(movieId);
      if (movie) {
        myMovies.push(movie);
        localStorage.setItem('myMovies', JSON.stringify(myMovies));
      }
    }
  }

  removeFromMyMovies(movieId: number): void {
    const myMovies = this.getMyMovies().filter(m => m.id !== movieId);
    localStorage.setItem('myMovies', JSON.stringify(myMovies));
  }

  getMyMovies(): Movie[] {
    const stored = localStorage.getItem('myMovies');
    return stored ? JSON.parse(stored) : [];
  }

  isInMyMovies(movieId: number): boolean {
    return this.getMyMovies().some(m => m.id === movieId);
  }
}
