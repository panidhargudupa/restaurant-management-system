import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartItem } from '../models/models';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal = 0;
  tax = 0;
  total = 0;
  customerName = '';
  paymentMethod = 'Cash';
  orderPlaced = false;
  orderId: number | null = null;
  isLoading = false;

  constructor(private service: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.service.cart$.subscribe(items => {
      this.cartItems = items;
      this.subtotal = this.service.getCartTotal();
      this.tax = Math.round(this.subtotal * 0.05);
      this.total = this.subtotal + this.tax;
    });
  }

  placeOrder(): void {
    if (!this.customerName.trim()) return;
    this.isLoading = true;

    const order = {
      customerName: this.customerName,
      paymentMethod: this.paymentMethod,
      orderItems: this.cartItems.map(c => ({
        menuItemId: c.menuItem.id!,
        quantity: c.quantity
      }))
    };

    this.service.placeOrder(order).subscribe({
      next: (res) => {
        this.orderId = res.id!;
        this.orderPlaced = true;
        this.service.clearCart();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to place order. Please try again.');
      }
    });
  }
}
