import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Coche } from 'src/app/interfaces/coche';

@Component({
  selector: 'app-coches-cards',
  templateUrl: './coches-cards.component.html',
  styleUrls: ['./coches-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CochesCardsComponent implements OnInit {
  @Input() coches!: Array<Coche>;
  @Input() isLoading!: boolean;

  ngOnInit(): void {
    // Component initialization
  }

  /**
   * TrackBy function for optimal rendering performance
   * @param index - Array index
   * @param coche - Car object
   * @returns Unique identifier for the car
   */
  trackByCoche(index: number, coche: Coche): number {
    return coche.idCoche;
  }
}
