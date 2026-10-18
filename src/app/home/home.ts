import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { Counter } from '../components/counter/counter';

@Component({
  imports: [Greeting, Counter],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  homeMessage = signal('Hello, world!');

  keyUpHandler(event: KeyboardEvent) {
    console.log(`user pressed the ${event.key} key`);
  }
}
