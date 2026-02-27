import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Pokemon } from './services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nombre1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nombre1.component.html',
  styleUrl: './nombre1.component.css',
  providers: [ApiService]
})
export class Nombre1Component implements OnInit, OnDestroy {
  pokemonActual: Pokemon | null = null;
  pokemonList: Array<{ name: string; url: string }> = [];
  loading = false;
  error: string | null = null;
  selectedPokemon: string = '';
  private subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) {
    // Se inicia la suscripción en el constructor para cargar un Pokémon al inicio
    this.loadRandomPokemon();
  }

  ngOnInit() {
    // Cargar lista de Pokémon
    this.loadPokemonList();
  }

  loadPokemonList() {
    this.loading = true;
    const subscription = this.apiService.getPokemonList(20).subscribe({
      next: (data) => {
        this.pokemonList = data.results;
        this.loading = false;
        console.log('Lista de Pokémon cargada:', this.pokemonList);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de Pokémon';
        this.loading = false;
        console.error(err);
      }
    });
    this.subscriptions.push(subscription);
  }

  loadRandomPokemon() {
    this.loading = true;
    this.error = null;
    const subscription = this.apiService.getRandomPokemon().subscribe({
      next: (pokemon) => {
        this.pokemonActual = pokemon;
        this.loading = false;
        console.log('Pokémon aleatorio cargado:', pokemon);
      },
      error: (err) => {
        this.error = 'Error al cargar Pokémon aleatorio';
        this.loading = false;
        console.error(err);
      }
    });
    this.subscriptions.push(subscription);
  }

  loadPokemonByName(name: string) {
    if (!name.trim()) return;
    
    this.loading = true;
    this.error = null;
    const subscription = this.apiService.getPokemonDetail(name.toLowerCase()).subscribe({
      next: (pokemon) => {
        this.pokemonActual = pokemon;
        this.selectedPokemon = '';
        this.loading = false;
        console.log('Pokémon cargado:', pokemon);
      },
      error: (err) => {
        this.error = `Error: No se encontró el Pokémon "${name}"`;
        this.loading = false;
        console.error(err);
      }
    });
    this.subscriptions.push(subscription);
  }

  selectPokemonFromList(name: string) {
    this.loadPokemonByName(name);
  }

  ngOnDestroy() {
    // Se desuscriben todas las suscripciones cuando el componente se destruye
    this.subscriptions.forEach(sub => sub.unsubscribe());
    console.log('Desuscrito de todas las suscripciones');
  }
}
