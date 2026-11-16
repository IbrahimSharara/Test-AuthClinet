import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    MatSnackBarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentUser: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private matsnka: MatSnackBar,
  ) {
    this.currentUser = this.authService.getUserDetails();
  }

  isLoggedIn() {
    return this.authService.isLogedIn();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.matsnka.open('Logged out Successfully', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
    });
  }
}
