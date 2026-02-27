import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Pokemon } from './services/api.service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent implements OnInit, OnDestroy {
  pokemonList: Pokemon[] = [];
  loading = false;
  error: string | null = null;
  searchTerm: string = '';
  filteredPokemon: Pokemon[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAllPokemon();
  }

  loadAllPokemon() {
    this.loading = true;
    this.error = null;
    
    // Cargar la lista de 150 Pokémon
    const subscription = this.apiService.getPokemonList(150).subscribe({
      next: (data) => {
        // Cargar detalles de cada Pokémon
        const pokemonRequests = data.results.map((p, index) => {
          return this.apiService.getPokemonDetail(index + 1);
        });

        // Usar forkJoin para esperar todas las solicitudes
        const allPokemonSub = forkJoin(pokemonRequests).subscribe({
          next: (pokemons) => {
            this.pokemonList = pokemons;
            this.filteredPokemon = pokemons;
            this.loading = false;
            console.log('Todos los Pokémon cargados:', pokemons.length);
          },
          error: (err) => {
            this.error = 'Error al cargar los detalles de Pokémon';
            this.loading = false;
            console.error(err);
          }
        });
        this.subscriptions.push(allPokemonSub);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de Pokémon';
        this.loading = false;
        console.error(err);
      }
    });
    this.subscriptions.push(subscription);
  }

  searchPokemon(term: string) {
    if (!term.trim()) {
      this.filteredPokemon = this.pokemonList;
    } else {
      const lowerTerm = term.toLowerCase();
      this.filteredPokemon = this.pokemonList.filter(p => 
        p.name.toLowerCase().includes(lowerTerm)
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}