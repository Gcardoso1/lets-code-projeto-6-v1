import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service'
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  registerForm?: FormGroup;
  
  constructor(
      private _api: ApiService,
      private _router:Router
  ) { }
  
  ngOnInit() {
      this.registerForm = new FormGroup({
          'nome': new FormControl(null),
          'email': new FormControl(null),
          'senha': new FormControl(null),
        });
  }
  onSubmit() {
      let nome = this.registerForm?.controls['nome'].value;
      let email = this.registerForm?.controls['email'].value;
      let senha = this.registerForm?.controls['senha'].value;
      console.log('Your form data : ', this.registerForm);
      this._api.postTypeRequest('user/register', 
              {username:nome, email: email, password:senha}).subscribe((res: any) => {
          if (res.status) {
              console.log(res)
              this._router.navigate(['/login']);
          } else {
              console.log(res)
              alert(res.msg)
          }
      }, (err: { [x: string]: { message: any; }; }) => {
          this.errorMessage = err['error'].message;
      });
  }
  
}
