import { UserDetails } from '../../models/user-details';
import { AuthService } from './../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService);
  userDetails!: UserDetails;
  ngOnInit(): void {
    this.authService.getDetails().subscribe({
      next: (result) => {
        this.userDetails = result;
      },
      error: (err) => console.log(err),
    });
  }
}
