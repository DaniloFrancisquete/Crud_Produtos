import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../service/product.service.service';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

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

  constructor(private productService: ProductService, private dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  logout(): void {
    this.router.navigate(['/login']);
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
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '500px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(product.id, result).subscribe(
          () => {
            this.loadProducts();
          },
          (error) => {
            console.error('Erro ao atualizar produto', error);
          }
        );
      }
    });
  }
}
