import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RoleCreateRequest } from '../../models/role-create-request';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, FormsModule, MatError],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css',
})
export class RoleFormComponent {
  @Input({ required: true }) role!: RoleCreateRequest;
  @Input() errorMessage!: string;
  @Output() addRole: EventEmitter<RoleCreateRequest> =
    new EventEmitter<RoleCreateRequest>();
  add() {
    this.addRole.emit(this.role);
  }
}
