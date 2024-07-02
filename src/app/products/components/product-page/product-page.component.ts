import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../store/products.action';

@Component({
  selector: 'fd-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  private readonly store = inject(Store);

  public product$: Observable<Product> | undefined;

  constructor(
    private readonly productsService: ProductsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const productId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getProduct(productId);
  }

  public getProduct(id: number): void {
    this.product$ = this.productsService.getById(id);
  }

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
