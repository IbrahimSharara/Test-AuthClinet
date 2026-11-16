import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLogedIn!: boolean;
  currentUser!: any;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.isLogedIn = localStorage.getItem(environment.tokenKey) ? true : false;
    this.currentUser = this.auth.getUserDetails();
  }
}
