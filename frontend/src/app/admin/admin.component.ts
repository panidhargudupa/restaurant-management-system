import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../models/models';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  menuItems: MenuItem[] = [];
  showForm = false;
  isEditing = false;
  currentItem: MenuItem = this.emptyItem();

  constructor(private service: RestaurantService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getMenuItems().subscribe(items => this.menuItems = items);
  }

  emptyItem(): MenuItem {
    return { name: '', category: '', price: 0, isAvailable: true, imageUrl: '', description: '' };
  }

  openAdd(): void {
    this.currentItem = this.emptyItem();
    this.isEditing = false;
    this.showForm = true;
  }

  openEdit(item: MenuItem): void {
    this.currentItem = { ...item };
    this.isEditing = true;
    this.showForm = true;
  }

  save(): void {
    if (this.isEditing) {
      this.service.updateMenuItem(this.currentItem.id!, this.currentItem).subscribe(() => {
        this.loadItems();
        this.showForm = false;
      });
    } else {
      this.service.createMenuItem(this.currentItem).subscribe(() => {
        this.loadItems();
        this.showForm = false;
      });
    }
  }

  delete(id: number): void {
    if (confirm('Delete this item?')) {
      this.service.deleteMenuItem(id).subscribe(() => this.loadItems());
    }
  }

  cancel(): void {
    this.showForm = false;
  }
}
