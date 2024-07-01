import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './components/product-page/product-page.component';

@NgModule({
  declarations: [ProductEditComponent, ProductPageComponent],
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class ProductsModule {}
