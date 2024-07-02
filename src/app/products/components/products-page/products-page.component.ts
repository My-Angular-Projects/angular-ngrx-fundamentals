import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Product } from '../../interfaces';
import { select, Store } from '@ngrx/store';
import { ProductsActions } from '../../store/products.action';
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

  public readonly total$ = this.store.pipe(
    select(productsFeature.selectProductsSum),
  );

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  public toggleShowProductCode(): void {
    this.store.dispatch(ProductsActions.toggleShowProductCode());
  }
}
