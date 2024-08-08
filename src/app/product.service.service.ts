import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/products';

  constructor(private http: HttpClient, private authservice: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authservice.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-product`, product, { headers: this.getHeaders() });
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-all-products`, { headers: this.getHeaders() });
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-one-product/${id}`, { headers: this.getHeaders() });
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/update-product/${id}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-product/${id}`, { headers: this.getHeaders() });
  }
}
