import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent {
  product: any;

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = { ...data.product }; // Copia os dados do produto passado
  }

  onConfirm(): void {
    this.dialogRef.close(this.product); // Fecha o modal e retorna os dados do produto
  }

  onCancel(): void {
    this.dialogRef.close(); // Fecha o modal sem retornar dados
  }
}
