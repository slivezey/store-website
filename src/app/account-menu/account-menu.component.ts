import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'account-menu',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.css'
})
export class AccountMenuComponent implements OnInit {

  signedIn = false;
  username = '';

  constructor(private userService: UserAccountService, private eventBus: EventService) {}

  ngOnInit(): void {
    this.signedIn = this.userService.isSignedIn();
    this.username = this.userService.getUsername();
    this.eventBus.listen('signin', (signIn: any) => {
      this.signedIn = true;
      this.username = signIn.username;
    });
    this.eventBus.listen('signout', (signOut: any) => {
      this.signedIn = false;
      this.username = '';
    });
  }

}
