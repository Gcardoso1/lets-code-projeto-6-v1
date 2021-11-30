import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { EditComponent } from './pages/edit/edit.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'task', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
