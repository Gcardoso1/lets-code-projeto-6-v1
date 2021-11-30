import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck, OnChanges {
  renderizar: boolean = false;
  view_task = false;
  create_task = false;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.mostrarMenu.subscribe(mostrar => this.renderizar = mostrar);
    console.log(this.router.url)
    if(this.router.url === '/'){
      this.view_task = false;
      this.create_task = true;
    }
    else if(this.router.url === '/task'){
      this.view_task = true;
      this.create_task = false;
    }
    else{
      this.view_task = true;
      this.create_task = true;
    }
  }

  ngAfterViewChecked() {
    if(this.router.url === '/'){
      this.view_task = false;
      this.create_task = true;
    }
    else if(this.router.url === '/task'){
      this.view_task = true;
      this.create_task = false;
    }
    else{
      this.view_task = true;
      this.create_task = true;
    }
  }

  ngAfterViewInit(){
    if(this.router.url === '/'){
      this.view_task = false;
      this.create_task = true;
    }
    else if(this.router.url === '/task'){
      this.view_task = true;
      this.create_task = false;
    }
    else{
      this.view_task = true;
      this.create_task = true;
    }
  }

  ngDoCheck() {

  }

  ngOnChanges() {

  }

  logoutUser() {
    this.loginService.logoutUser();
  }

}
