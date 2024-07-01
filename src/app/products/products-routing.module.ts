import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
  },
  {
    path: ':id',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
