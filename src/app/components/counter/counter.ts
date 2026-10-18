import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-counter',
  styleUrl: './counter.scss',
  templateUrl: './counter.html',
})
export class Counter {
  counterValue = signal(0);

  increment() {
    this.counterValue.update((val) => val + 1);
  }

  decrement() {
    this.counterValue.update((val) => val - 1);
  }

  reset() {
    this.counterValue.set(0);
  }
}
