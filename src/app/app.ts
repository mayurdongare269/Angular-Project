import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './components/header/header';

@Component({
  imports: [RouterOutlet, Home, Header],
  // imports: [Home, Header],
  selector: 'app-root',
  styleUrl: './app.scss',
  // templateUrl: './app.html',

  template: `
    <app-header />
    <!-- <app-home></app-home> -->
    <main>
        <router-outlet />
    </main>

    <!-- <router-outlet /> -->
  `,

  styles: [`
    main {
      padding: 16px;

    }
  `]
})
export class App {
  protected readonly title = signal('first-ng-app');
}
