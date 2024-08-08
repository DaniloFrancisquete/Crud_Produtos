import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  newProduct: any = { name: '', description: '', price: 0, stock: 0 };
  isLoading: boolean = false;

  constructor(private productService: ProductService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe(
      products => {
        this.isLoading = false;
        this.products = products;
      },
      error => {
        this.isLoading = false;
        this.snackBar.open('Erro ao carregar produtos.', 'Fechar', { duration: 3000 });
      }
    );
  }

  addProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      response => {
        this.snackBar.open('Produto adicionado com sucesso!', 'Fechar', { duration: 3000 });
        this.loadProducts();
      },
      error => {
        this.snackBar.open('Erro ao adicionar produto.', 'Fechar', { duration: 3000 });
      }
    );
  }

  // Implementar métodos para editar e excluir produtos aqui
}
