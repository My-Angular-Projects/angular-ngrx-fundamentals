import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'fd-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {
  product$: Observable<Product> | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const productId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getProduct(productId);
  }

  getProduct(id: number) {
    this.product$ = this.productsService.getById(id);
  }

  addProduct(product: Product) {
    this.productsService.add(product).subscribe(this.goToProductsPage);
  }

  updateProduct(product: Product) {
    this.productsService.update(product).subscribe(this.goToProductsPage);
  }

  deleteProduct(id: number) {
    this.productsService.delete(id).subscribe(this.goToProductsPage);
  }

  goToProductsPage = () => this.router.navigate(['/products']);
}
