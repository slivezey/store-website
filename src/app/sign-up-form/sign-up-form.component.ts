import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { UserAccountService } from '../user-account.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), NoWhitespaceValidator()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), NoWhitespaceValidator()]),
    passwordConfirm: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserAccountService, private router: Router) {}

  submitForm() {
    let username = this.signUpForm.get('username')?.value!;
    let email = this.signUpForm.get('email')?.value!;
    let password = this.signUpForm.get('password')?.value!;

    this.userService.signUp(username, email, password).subscribe({
      next: (result: { success: boolean, message: string }) => {
        if (result.success) {
          alert('Congratulations!  Your account was created successfully!\nPlease sign in.');
          this.router.navigate(['/sign-in']);
        } else {
          alert(result.message);
        }
      }
    });
  }

  checkField(fieldName: string): boolean {
    let field = this.signUpForm.get(fieldName);

    return (field == null) ? false : field?.invalid && (field?.dirty || field?.touched);
  }

}

function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let hasWhitespace = /\s/g.test(control.value);
    return !hasWhitespace ? {} : { 'whitespace': 'value contains whitespace' };
  };
}
