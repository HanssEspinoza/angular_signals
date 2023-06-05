import { Component, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styles: [
  ]
})
export class CounterPageComponent {
  public counter = signal(10);
  public squareCounter = computed(() => this.counter() * this.counter());

  increaseBy(value: number): void {
    this.counter.update(current => current + value);
  }

}
