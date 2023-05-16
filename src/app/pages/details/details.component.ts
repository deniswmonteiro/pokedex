import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

// Services
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private urlApiPokemon: string = "https://pokeapi.co/api/v2/pokemon";
  private urlApiPokemonName: string = "https://pokeapi.co/api/v2/pokemon-species";
  public pokemon: any;
  public loaded: boolean = false;

  constructor(
    private activeRoute:ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokemonDetails;
  }

  get pokemonDetails() {
    const id = this.activeRoute.snapshot.params["id"];
    const apiPokemon = this.pokeApiService.apiGetPokemon(`${this.urlApiPokemon}/${id}`);
    const apiPokemonName = this.pokeApiService.apiGetPokemon(`${this.urlApiPokemonName}/${id}`);

    return forkJoin([apiPokemon, apiPokemonName]).subscribe({
      next: (response) => {
        this.pokemon = response;
        this.loaded = true;
      },
      error: (error) => error
    });
  }
}
