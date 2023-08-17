import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart.service";

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 355,
  4: 350,
};
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onColumnsCountChange(count: number): void {
    this.cols = count;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(category: string): void {
    this.category = category;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }
}
