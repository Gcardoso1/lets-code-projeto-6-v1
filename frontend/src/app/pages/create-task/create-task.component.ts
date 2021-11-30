import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service'

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  loginForm?: FormGroup;
  errorMessage: any

  constructor(
    private _api: ApiService,
    private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'titulo': new FormControl(null),
      'descricao': new FormControl(null),
      'data_entrega': new FormControl(null),
      'prioridade': new FormControl(null),
    });
  }

  onSubmit() {
    let titulo = this.loginForm?.controls['titulo'].value;
    let descricao = this.loginForm?.controls['descricao'].value;
    let data_entrega = this.loginForm?.controls['data_entrega'].value;
    let prioridade = this.loginForm?.controls['prioridade'].value;
    console.log(this.loginForm);

    this._api.postTypeRequest('user/create-task', 
    {id_users:JSON.parse(localStorage.getItem('userData') || '{}')[0]["id"],
    titulo: titulo, descricao: descricao, data_entrega:data_entrega, prioridade:prioridade}    
    ).subscribe((res: any) => {
      if (res.status) {
          console.log(res)
          this._router.navigate(['read']);
      } else {
          console.log(res)
          alert(res.msg)
      }
      }, (err: { [x: string]: { message: any; }; }) => {
          this.errorMessage = err['error'].message;
      });

    //this.loginService.loginUser(email, password);
  }

  voltar(){
    this._router.navigate(['/read']);
  }

}
