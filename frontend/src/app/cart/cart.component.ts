import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItem } from '../models/models';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private service: RestaurantService) {}

  ngOnInit(): void {
    this.service.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.service.getCartTotal();
    });
  }

  updateQty(menuItemId: number, quantity: number): void {
    if (quantity < 1) {
      this.service.removeFromCart(menuItemId);
    } else {
      this.service.updateQuantity(menuItemId, quantity);
    }
  }

  remove(menuItemId: number): void {
    this.service.removeFromCart(menuItemId);
  }
}
