import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  private cartKey = "cart";
  constructor(
    private _snackBar: MatSnackBar,
    private localStorageService: LocalStorageService
  ) {
    const savedCart = this.localStorageService.getItem("cart");
    if (savedCart) {
      this.cart.next(savedCart);
    }
  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }
    this.cart.next({ items });
    this._snackBar.open("Product added to cart", "Close", {
      duration: 2000,
    });
    this.updateLocalStorage(this.cart.value);
  }

  getTotal(items: Array<CartItem>): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is cleared", "Ok", {
      duration: 2000,
    });
    this.updateLocalStorage(this.cart.value);
  }

  removeFromCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const filteredItems = items.filter((_item) => _item.id !== item.id);

    this.cart.next({ items: filteredItems });
    this._snackBar.open("Product removed from cart", "Close", {
      duration: 2000,
    });
    this.updateLocalStorage(this.cart.value);
  }

  removeQuantity(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => item.id === _item.id);

    if (itemInCart) {
      itemInCart.quantity -= 1;
    }

    if (itemInCart && itemInCart.quantity === 0) {
      this.removeFromCart(item);
    } else {
      this.cart.next({ items });
      this._snackBar.open("Product quantity updated", "Close", {
        duration: 2000,
      });
      this.updateLocalStorage(this.cart.value);
    }
  }

  updateLocalStorage(cart: Cart): void {
    this.localStorageService.setItem(this.cartKey, cart);
  }
}
