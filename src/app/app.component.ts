import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <input type="text" #tareaInput>
    
    <button (click)="f(tareaInput)">Agregar</button>
    
    <ul>
      @for (item of items; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `
})
export class AppComponent {
  items: string[] = [];

  
  f(input: HTMLInputElement): void {
    if (input.value.trim() !== "") {
      this.u(input.value);
      input.value = ""; 
    }
  }

 
  u(texto: string): void {
    this.items.push(texto);
  }
}