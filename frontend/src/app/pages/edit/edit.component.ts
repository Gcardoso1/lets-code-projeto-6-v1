import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from './../../services/api.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: string;

  loginForm?: FormGroup;
  errorMessage: any

  titulo: any
  descricao: any
  data_entrega: any
  prioridade: any
  id_task: any

  constructor(
    private _api: ApiService,
    private _router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this._api.postTypeRequest('user/read-one-task', 
    {id_task:this.id}).subscribe((res: any) => {
      if (res.status) {
          console.log(res)
          //this.loginForm?.controls['descricao'].value = res.data[0]
          this.titulo = res.data[0]["title"]
          this.descricao = res.data[0]["description"]
          this.data_entrega = res.data[0]["dueDate"]
          this.prioridade = res.data[0]["priority"]
          this.id_task = res.data[0]["id_task"]
      } else {
          console.log(res)
          alert(res.msg)
      }
      }, (err: { [x: string]: { message: any; }; }) => {
          this.errorMessage = err['error'].message;
      });

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
    console.log(titulo, descricao, data_entrega, prioridade);

    this._api.postTypeRequest('user/update-task', 
    {id_task:this.id_task, titulo: titulo, descricao: descricao, data_entrega:data_entrega, prioridade:prioridade}    
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
