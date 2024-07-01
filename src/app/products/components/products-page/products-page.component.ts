import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { sumProducts } from '../../helpers/sum-products.helper';

@Component({
  selector: 'fd-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  total = 0;
  loading = true;
  showProductCode = false;
  errorMessage = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.total = sumProducts(products);
        this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.showProductCode = !this.showProductCode;
  }
}
