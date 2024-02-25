import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAccountService } from '../user-account.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {

  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserAccountService, private router: Router) {}

  submitForm() {
    let username = this.signInForm.get('username')?.value!;
    let password = this.signInForm.get('password')?.value!;

    this.userService.signIn(username, password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['']);
        } else {
          alert('Unable to login.  Please check your credentials.');
        }
      }
    });
  }

  checkField(fieldName: string): boolean {
    let field = this.signInForm.get(fieldName);

    return (field == null) ? false : field?.invalid && (field?.dirty || field?.touched);
  }

}
