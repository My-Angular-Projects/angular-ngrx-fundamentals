import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'fd-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  @Input() products: Product[] | null = [];
  @Input() total: number | null = 0;
  @Input() showProductCode: boolean | null = false;
  @Output() toggleProductCode = new EventEmitter<void>();
}
