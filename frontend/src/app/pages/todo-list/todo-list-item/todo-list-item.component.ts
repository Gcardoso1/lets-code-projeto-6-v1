import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api.service'

import { Task, TaskPriority } from './../../../models/task.model';

@Component({
  selector: 'pages-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  @Input('taskObj') task?: Task;
  @Input() taskId?: number;
  @Output() warnTaskWasDone: EventEmitter<any> = new EventEmitter();
  @ViewChild('checkboxInput') checkboxInput?: ElementRef;

  tasksList: Task[] = [];
  errorMessage: any

  constructor(
    private _api: ApiService,
    private router:Router) { }

  ngOnInit(): void {}

  getColor(): string {
    switch(this.task?.priority) {
      case "Low":
        return "#f5e769";
      case "Medium":
        return "#f5b869";
      case "High":
        return "#f56969";
      default:
        return "white";
    }
  }

  getClass(): string {
    switch(this.task?.priority) {
      case "Low":
        return "bg-yellow";
      case "Medium":
        return "bg-orange";
      case "High":
        return "bg-red";
      default:
        return "";
    }
  }

  markAsDone(event: MatCheckboxChange, id_task: any) {
    console.log(this.checkboxInput);
    console.log(event.checked);
    var done = 0
    if(event.checked){
      done=1
    }else{
      done=0
    }
    console.log(id_task);
    this._api.postTypeRequest('user/task-done', 
      {id_task:id_task, done: done}).subscribe((res: any) => {
      if (res.status) {
        console.log(res)
      } else {
      }
    }, (err: { [x: string]: { message: any; }; }) => {
      this.errorMessage = err['error'].message;
    });
    this.warnTaskWasDone.emit({ id: this.taskId, value: event.checked });
  }

  editarTask(id: any){
    console.log(id)
    this.router.navigate(['update/'+id]);
  }

  deletarTask(id: any){
    this._api.postTypeRequest('user/delete-task', 
      {id_task:id}).subscribe((res: any) => {
      if (res.status) {
        console.log(res)
        window.location.reload();
      } else {
      }
    }, (err: { [x: string]: { message: any; }; }) => {
      this.errorMessage = err['error'].message;
    });
  }

}
