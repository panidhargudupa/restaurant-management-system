export interface MenuItem {
  id?: number;
  name: string;
  category: string;
  price: number;
  isAvailable: boolean;
  imageUrl: string;
  description: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id?: number;
  customerName: string;
  orderDate?: string;
  totalAmount?: number;
  status?: string;
  paymentMethod?: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  menuItemId: number;
  quantity: number;
  price?: number;
}
