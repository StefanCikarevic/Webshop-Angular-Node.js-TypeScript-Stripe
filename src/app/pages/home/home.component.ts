import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart.service";
import { Subscription } from "rxjs";
import { StoreService } from "../../services/store.service";

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
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Product[] | undefined;
  sort = "desc";
  count = 12;
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((products) => {
        this.products = products;
      });
  }

  onColumnsCountChange(count: number): void {
    this.cols = count;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.getProducts();
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
  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
  onSortChange(sort: string): void {
    this.sort = sort;
    this.getProducts();
  }
  onItemsCountChange(count: number): void {
    this.count = count;
    this.getProducts();
  }
}
