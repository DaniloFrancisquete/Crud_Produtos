import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  newProduct = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };
  isLoading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar produtos', error);
        this.isLoading = false;
      }
    );
  }

  addProduct(): void {
    this.isLoading = true;
    this.productService.createProduct(this.newProduct).subscribe(
      () => {
        this.loadProducts();
        this.newProduct = { name: '', description: '', price: 0, stock: 0 };
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao adicionar produto', error);
        this.isLoading = false;
      }
    );
  }
}
