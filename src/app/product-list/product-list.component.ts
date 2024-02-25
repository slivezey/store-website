import { Component } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  text: string = 'Original Message';

  constructor(private store: StoreService) {}

  echoText(text: string) {
    this.store.echoText(text).subscribe({
      next: message => this.text = message
    })
  }

}
