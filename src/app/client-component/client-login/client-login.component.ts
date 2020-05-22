import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {

  public isRemberMeChecked: boolean = false;
  public isLoginFailed: boolean = false;
  public loadingLogin: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['CUSTOMER']
  });

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repassword: ['', Validators.required],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)]],

  }, { validator: this.checkPasswords });

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('repassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  login = () => {
    this.loadingLogin = true;
    this.authService.clientLogin(this.loginForm.value).subscribe(
      response => {
        //console.log(response['data']);
        if(response['data']==this.loginForm.controls.username.value){
          if(this.isRemberMeChecked) {
            localStorage.setItem('token', response['data'])
          } else {
            sessionStorage.setItem('token', response['data'])
          }
          this.router.navigate(['/client/index'])
        } else {
          this.isLoginFailed = true;
          this.loadingLogin = false;
        }

        
      }
    )
  }

}
