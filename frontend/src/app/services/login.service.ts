import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticated: boolean = false;
  errorMessage: any

  mostrarMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _api: ApiService,
    private router: Router) { }

  loginUser(email: string, password: string) {
    //this.authenticated = (email === 'admin@admin.com' && password === '123456');
    //console.log(this.authenticated);
    //if (this.authenticated) this.router.navigate(['']);

    this._api.postTypeRequest('user/login', {username:email, password:password}).subscribe((res: any) => {
      if (res.status) {
        console.log(res)
        this.router.navigate(['/read']);
        this.authenticated = true
        this.mostrarMenu.emit(this.authenticated);
        localStorage.setItem("userData", JSON.stringify(res.data));
      } else {
      }
    }, (err: { [x: string]: { message: any; }; }) => {
      this.errorMessage = err['error'].message;
    });
  }

  logoutUser() {
    this.authenticated = false;
    this.mostrarMenu.emit(this.authenticated);
    this.router.navigate(['login']);
    localStorage.clear();
  }

  userIsLoggedIn(): boolean {
    if(localStorage.getItem("userData")){
      this.mostrarMenu.emit(true);
      return true;
    }else{
      this.mostrarMenu.emit(true);
      return false;
    }
  }
}
