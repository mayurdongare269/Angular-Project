import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-greeting',
  styleUrl: './greeting.scss',
  templateUrl: './greeting.html',
})
export class Greeting {
  message = input('Hello hello!');
}
