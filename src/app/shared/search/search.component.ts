import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() public emitSearch: EventEmitter<string> = new EventEmitter;

  constructor() { }

  ngOnInit(): void { }

  public postPokemonSearch(value: string) {
    this.emitSearch.emit(value);
  }
}
