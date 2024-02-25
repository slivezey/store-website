import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountMenuComponent } from './account-menu/account-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccountMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
