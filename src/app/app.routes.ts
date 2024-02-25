import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignOutFormComponent } from './sign-out-form/sign-out-form.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'sign-in', component: SignInFormComponent },
  { path: 'sign-up', component: SignUpFormComponent },
  { path: 'sign-out', component: SignOutFormComponent },
];
