
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service.service';

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
      (response: any) => {
        this.products = response.data.products; // Acessa o array de produtos corretamente
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
        this.loadProducts(); // Recarrega a lista de produtos
        this.newProduct = { name: '', description: '', price: 0, stock: 0 }; // Reseta o formulário
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao adicionar produto', error);
        this.isLoading = false;
      }
    );
  }

  editProduct(product: any): void {
    // Implementar lógica para editar o produto
    console.log('Edit product:', product);
  }

  deleteProduct(id: number): void {
    this.isLoading = true;
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts(); // Recarrega a lista de produtos após exclusão
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao excluir produto', error);
        this.isLoading = false;
      }
    );
  }
}
