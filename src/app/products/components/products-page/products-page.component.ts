import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { sumProducts } from '../../helpers/sum-products.helper';
import { select, Store } from '@ngrx/store';
import { ProductsActionGroup } from '../../store/products.action';
import { Observable } from 'rxjs';
import { productsFeature } from '../../store/products.reducer';

@Component({
  selector: 'fd-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnInit {
  private readonly store = inject(Store);

  products: Product[] = [];
  total = 0;
  loading = true;
  errorMessage = '';

  public readonly showProductCode$: Observable<boolean> = this.store.pipe(
    select(productsFeature.selectShowProductCode),
  );

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.total = sumProducts(products);
        this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  public toggleShowProductCode(): void {
    this.store.dispatch(ProductsActionGroup.toggleShowProductCode());
  }
}
