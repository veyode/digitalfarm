import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'waziupfront-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ],
})
export class NavbarComponent implements OnInit {
  current_user:any;

  constructor(
    private _authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.current_user=JSON.parse(sessionStorage.getItem('useremail'));
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
