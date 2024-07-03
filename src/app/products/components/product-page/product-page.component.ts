import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Product } from '../../interfaces';
import { select, Store } from '@ngrx/store';
import { ProductsActions } from '../../store/products.action';
import { productsFeature } from '../../store/products.reducer';

@Component({
  selector: 'fd-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {
  private readonly store = inject(Store);

  public readonly product$ = this.store.pipe(
    select(productsFeature.selectByProductId),
  );

  public addProduct(product: Product): void {
    this.store.dispatch(ProductsActions.addProduct({ product }));
  }

  public updateProduct(product: Product): void {
    this.store.dispatch(ProductsActions.updateProduct({ product }));
  }

  public deleteProduct(id: number): void {
    this.store.dispatch(ProductsActions.removeProduct({ id }));
  }
}
