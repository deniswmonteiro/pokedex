import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Observable
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private url: string = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100";

  constructor(
    private http: HttpClient
  ) { }

  get apiPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap((response) => response.results.map((result: any) => {
        this.apiGetPokemon(result.url).subscribe({
          next: (response) => result.details = response,
          error: (error) => error
        });
      }))
    );
  }

  public apiGetPokemon(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      tap((response) => response)
    );
  }
}
