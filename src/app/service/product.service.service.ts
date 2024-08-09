// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/products';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token não encontrado');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-product`, product, { headers: this.getHeaders() });
  }

  getAllProducts(): Observable<{ data: { products: Product[] } }> {
    return this.http.get<{ data: { products: Product[] } }>(`${this.apiUrl}/get-all-products`, { headers: this.getHeaders() });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/get-one-product/${id}`, { headers: this.getHeaders() });
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/update-product/${id}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-product/${id}`, { headers: this.getHeaders() });
  }
}
