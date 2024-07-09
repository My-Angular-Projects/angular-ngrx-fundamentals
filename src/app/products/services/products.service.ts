import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productsAPIUrl = 'api/products';
  private readonly http = inject(HttpClient);

  public getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsAPIUrl)
      .pipe(catchError(this.handleError));
  }

  public add({ name, price }: Product): Observable<Product> {
    return this.http
      .post<Product>(this.productsAPIUrl, { name, price })
      .pipe(catchError(this.handleError));
  }

  public update(product: Product): Observable<Product> {
    return this.http
      .put<Product>(this.productsAPIUrl, product)
      .pipe(catchError(this.handleError));
  }

  public delete(id: number): Observable<unknown> {
    const url = `${this.productsAPIUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: Something bad happened.`);
  }
}
