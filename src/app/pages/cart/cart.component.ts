import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "../../models/cart.model";
import { CartService } from "../../services/cart.service";
import { HttpClient } from "@angular/common/http";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  };
  dataSource: CartItem[] = [];

  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }
  onCheckout(): void {
    this.http
      .post("http://localhost:59135/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51Ng6H5BeYWt8epzELLo7XRzUBDdMQxknTuubQorDjTfYgJUS0ehm0k8CCxl6syc5SQnXvJqNIgKCVK93eez9rIiX00xy2aiHeJ"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
