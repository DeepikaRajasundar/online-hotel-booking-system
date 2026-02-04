import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface CartItem {
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.loadCartItems();
      this.route.queryParams.subscribe(params => {
        const customerName = params['customerName'] || '';
        const checkInDate = params['checkInDate'] || '';
        const checkOutDate = params['checkOutDate'] || '';
        if (customerName && checkInDate && checkOutDate) {
          this.cartItems.push({ customerName, checkInDate, checkOutDate });
          this.saveCartItems();
        }
      });
    } else {
      console.error('localStorage is not available. Unable to store cart items.');
      // Optionally, handle the situation where localStorage is not available
    }
  }

  loadCartItems() {
    if (typeof localStorage !== 'undefined') {
      const savedItems = localStorage.getItem('cartItems');
      if (savedItems) {
        this.cartItems = JSON.parse(savedItems);
      }
    }
  }

  saveCartItems() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCartItems();
  }
}
