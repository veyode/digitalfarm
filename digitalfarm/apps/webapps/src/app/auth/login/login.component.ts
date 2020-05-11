import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth/auth.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'waziupfront-login',
  templateUrl: './login.component.html',
  styles: [
  ],
})
export class LoginComponent implements OnInit ,OnDestroy{
  private unsubscribeAll = new Subject;
  loginForm: FormGroup;
  loading=false;
  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      username: [ '', [
        Validators.required,
      ]
      ],
      password: [ '', [
        Validators.required,
        Validators.minLength(2),
      ]
      ]
    });
  }

  signinUser() {
    this.loading = true;
    const userInfo = this.loginForm.value;
    this._authService.loginUser(userInfo).pipe(takeUntil(this.unsubscribeAll)).subscribe(
      (res) => {

        if (res) {
          this.loading=false;
          this._authService.storeCredentials(res);


          sessionStorage.setItem('useremail',JSON.stringify(this.loginForm.value.username))
          this.router.navigate([ '/account' ]);




          /*auther

          this._authService.getcurrentUser(this.loginForm.value.username).pipe(takeUntil(this.unsubscribeAll)).subscribe(
            (result) => {

              if (result) {

                console.log('current user',result)
              }
            },
            (error) => {
              if (error) {
                this.loading = false;
              }
            }
          );

          */

        }
      },
      (error) => {
        if (error) {
          this.loading = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
