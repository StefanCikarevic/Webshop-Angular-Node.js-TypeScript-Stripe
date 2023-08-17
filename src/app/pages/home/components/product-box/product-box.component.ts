import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "../../../../models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
  styles: [],
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: "1",
    title: "Product 1",
    price: 100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://via.placeholder.com/150",
    category: "shoes",
  };
  @Output() addToCart = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
