import { Component, Input, OnInit } from '@angular/core';
import { Coche } from 'src/app/interfaces/coche';

@Component({
  selector: 'app-coches-cards',
  templateUrl: './coches-cards.component.html',
  styleUrls: ['./coches-cards.component.css'],
})
export class CochesCardsComponent implements OnInit{
  @Input() coches!: Array<Coche>;
  @Input() isLoading!: boolean;

  ngOnInit(): void {

  }

}
