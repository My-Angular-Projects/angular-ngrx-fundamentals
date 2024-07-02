import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Product } from '../../interfaces';
import { ProductsService } from '../../services/products.service';
import { sumProducts } from '../../helpers/sum-products.helper';
import { select, Store } from '@ngrx/store';
import {
  ProductsActions,
  ProductsAPIActions,
} from '../../store/products.action';
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
  private readonly productsService = inject(ProductsService);

  total = 0;

  public readonly products$: Observable<Product[]> = this.store.pipe(
    select(productsFeature.selectProducts),
  );

  public readonly showProductCode$: Observable<boolean> = this.store.pipe(
    select(productsFeature.selectShowProductCode),
  );

  public readonly loading$: Observable<boolean> = this.store.pipe(
    select(productsFeature.selectLoading),
  );

  public readonly errorMessage$: Observable<string> = this.store.pipe(
    select(productsFeature.selectErrorMessage),
  );

  ngOnInit(): void {
    this.getProducts();
  }

  // TODO: move to effect
  public getProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.store.dispatch(
          ProductsAPIActions.productsLoadedSuccess({ products }),
        );
        this.total = sumProducts(products);
      },
      // error: (error) => (this.errorMessage = error),
    });
  }

  public toggleShowProductCode(): void {
    this.store.dispatch(ProductsActions.toggleShowProductCode());
  }
}
