import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'fd-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  public product$: Observable<Product> | undefined;

  constructor(
    private readonly productsService: ProductsService,
    private readonly router: Router,
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
    this.productsService.add(product).subscribe(this.goToProductsPage);
  }

  public updateProduct(product: Product): void {
    this.productsService.update(product).subscribe(this.goToProductsPage);
  }

  public deleteProduct(id: number): void {
    this.productsService.delete(id).subscribe(this.goToProductsPage);
  }

  private goToProductsPage = () => this.router.navigate(['/products']);
}
