import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styles: [
  ]
})
export class UserInfoPageComponent implements OnInit {

  public userId = signal(1);

  private userService = inject(UsersService);

  public currentUser = signal<User | undefined>(undefined);

  public userWasFound = signal(true);

  public fullName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if ( id <= 0 ) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.userService.getUserById(id)
      .subscribe({
        next: (value) => {
          this.currentUser.set(value);
          this.userWasFound.set(true);
        },
        error: () => this.userWasFound.set(false)
      })
  }

}
