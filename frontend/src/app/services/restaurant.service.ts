import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MenuItem, CartItem, Order } from '../models/models';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private apiUrl = 'http://localhost:5000/api';
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) {}

  // Menu API
  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menu`);
  }

  createMenuItem(item: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(`${this.apiUrl}/menu`, item);
  }

  updateMenuItem(id: number, item: MenuItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/menu/${id}`, item);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/menu/${id}`);
  }

  // Cart management (local)
  addToCart(menuItem: MenuItem): void {
    const current = this.cartItems.value;
    const existing = current.find(c => c.menuItem.id === menuItem.id);
    if (existing) {
      existing.quantity++;
      this.cartItems.next([...current]);
    } else {
      this.cartItems.next([...current, { menuItem, quantity: 1 }]);
    }
  }

  removeFromCart(menuItemId: number): void {
    this.cartItems.next(this.cartItems.value.filter(c => c.menuItem.id !== menuItemId));
  }

  updateQuantity(menuItemId: number, quantity: number): void {
    const current = this.cartItems.value;
    const item = current.find(c => c.menuItem.id === menuItemId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...current]);
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  }

  // Order API
  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/order`, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order`);
  }
}
