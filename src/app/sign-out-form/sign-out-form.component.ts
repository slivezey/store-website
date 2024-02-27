import { Component } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out-form',
  standalone: true,
  imports: [],
  templateUrl: './sign-out-form.component.html',
  styleUrl: './sign-out-form.component.css'
})
export class SignOutFormComponent {

  signOutConfirmed = false;

  constructor(private userService: UserAccountService, private router: Router) {}

  signOut() {
    this.userService.signOut().subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['']);
        } else {
          alert('An error occurred.  Unable to sign out.');
        }
        this.signOutConfirmed = success;
      }
    });
  }

  cancelSignOut() {
    this.router.navigate(['']);
  }

}
