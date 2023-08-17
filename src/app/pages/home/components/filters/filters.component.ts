import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { StoreService } from "../../../../services/store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styles: [],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;
  constructor(private storeServices: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeServices
      .getAllCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
  ngOnDestroy() {
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
  }
}
