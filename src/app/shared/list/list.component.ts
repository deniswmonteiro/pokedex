import { Component, OnInit } from '@angular/core';

// Services
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private setAllPokemons: any;
  public getAllPokemons: any;

  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokeApiService.apiPokemons.subscribe({
      next: (response) => {
        this.setAllPokemons = response.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      error: (error) => error
    });
  }

  public getPokemonSearch(value: string) {
    const pokemonFilter = this.setAllPokemons.filter((response: any) => {
      return !response.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = pokemonFilter;
  }
}
