import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './../../services/login.service';

@Component({
  selector: 'pages-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;

  constructor(private loginService: LoginService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl(null),
      'password': new FormControl(null),
    });
  }

  onSubmit() {
    let login = this.loginForm?.controls['login'].value;
    let password = this.loginForm?.controls['password'].value;

    this.loginService.loginUser(login, password);
  }

  registrar(){
    this.router.navigate(['/register']);
  }
}
