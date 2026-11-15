import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLogedIn!: boolean;
  constructor() {}
  ngOnInit(): void {
    this.isLogedIn = localStorage.getItem(environment.tokenKey) ? true : false;
    console.log(this.isLogedIn);
  }
}
