import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

export interface PokemonList {
  results: Array<{
    name: string;
    url: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private pokeApiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  // Obtener lista de Pokémon
  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.pokeApiUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  // Obtener detalles de un Pokémon específico
  getPokemonDetail(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.pokeApiUrl}/pokemon/${nameOrId}`);
  }

  // Obtener Pokémon aleatorio
  getRandomPokemon(): Observable<Pokemon> {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    return this.getPokemonDetail(randomId);
  }
}
