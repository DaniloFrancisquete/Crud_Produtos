import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/products';

  constructor(private http: HttpClient) {}

  createProduct(product: { name: string; description?: string; price: number; stock: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-product`, product);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-all-products`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-one-product/${id}`);
  }

  updateProduct(id: number, product: { name: string; description?: string; price: number; stock: number }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/update-product/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-product/${id}`);
  }
}
