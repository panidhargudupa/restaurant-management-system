import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../models/models';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  categories: string[] = [];
  selectedCategory = 'All';
  cartCount = 0;
  addedItems: Set<number> = new Set();

  constructor(private service: RestaurantService) {}

  ngOnInit(): void {
    this.service.getMenuItems().subscribe(items => {
      this.menuItems = items;
      this.filteredItems = items;
      this.categories = ['All', ...new Set(items.map(i => i.category))];
    });
    this.service.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredItems = category === 'All'
      ? this.menuItems
      : this.menuItems.filter(i => i.category === category);
  }

  addToCart(item: MenuItem): void {
    this.service.addToCart(item);
    this.addedItems.add(item.id!);
    setTimeout(() => this.addedItems.delete(item.id!), 1000);
  }
}
