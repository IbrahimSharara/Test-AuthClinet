import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user-details';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {
    this.authService.getAll().subscribe({
      next: (res) => (this.users = res),
    });
  }
  users!: UserDetails[];
  authService = inject(AuthService);
}
