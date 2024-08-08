import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  taxNumber: string = '';
  mail: string = '';
  phone: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onRegister() {
    if (this.isFormValid()) {
      this.isLoading = true;

      const registerData = {
        name: this.name,
        taxNumber: this.taxNumber,
        mail: this.mail,
        phone: this.phone,
        password: this.password
      };

      this.http.post('https://interview.t-alpha.com.br/api/auth/register', registerData)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.snackBar.open('Registro realizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.isLoading = false;
            this.snackBar.open('Erro ao registrar. Tente novamente.', 'Fechar', {
              duration: 3000,
            });
          }
        });
    } else {
      this.snackBar.open('Preencha todos os campos corretamente.', 'Fechar', {
        duration: 3000,
      });
    }
  }

  private isFormValid(): boolean {
    return this.name !== '' && this.taxNumber !== '' && this.mail !== '' && this.phone !== '' && this.password !== '';
  }
}
