import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  taxNumber: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.taxNumber && this.password) {
      this.isLoading = true;
      this.authService.login(this.taxNumber, this.password).subscribe(
        response => {
          this.isLoading = false;
          this.authService.setToken(response.data.token);
          console.log(response.data.token)
          this.router.navigate(['/products']);
        },
        error => {
          this.isLoading = false;
          this.snackBar.open('Erro no login. Verifique suas credenciais.', 'Fechar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Preencha todos os campos.', 'Fechar', { duration: 3000 });
    }
  }
}
