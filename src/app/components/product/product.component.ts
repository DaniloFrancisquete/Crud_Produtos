import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Certifique-se de ter um componente de diálogo de confirmação

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

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.data.products;
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

  confirmDelete(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir este produto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(id: number): void {
    this.isLoading = true;
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao excluir produto', error);
        this.isLoading = false;
      }
    );
  }

  editProduct(product: any): void {
    // Você pode abrir um formulário para editar o produto ou usar um modal
    // Aqui está um exemplo simples usando o console
    console.log('Editando produto:', product);
  }
}
