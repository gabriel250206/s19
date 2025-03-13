import { Component, OnInit } from '@angular/core';
import { IonContent, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { TaskService, Task } from '../task.service'; 
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tareas',
  templateUrl: 'tareas.page.html',
  styleUrls: ['tareas.page.scss'],
  imports: [IonCard, IonContent, CommonModule, NgFor,FormsModule],
  standalone: true,
})
export class TareasPage implements OnInit {
  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(public taskService: TaskService, private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
    console.log(this.tasks$);
  }
  

  addItem(name: string, numtel: string): void {
    if (name.trim() && numtel.trim()) {
      const newTask: Task = { 
        name: name.trim(),
        numtel: numtel.trim(),
        completed: false
      };

      this.taskService.addTask(newTask)
        .then(() => console.log('número agregado correctamente'))
        .catch(error => console.error('Error al agregar número:', error));
    } else {
      console.error('El nombre y el día no pueden estar vacíos');
    }
  }
  deleteItem(id: string): void {
    this.taskService.deleteTask(id).then(() => {
      console.log('número eliminado correctamente');
    }).catch(error => {
      console.error('Error al eliminar número:', error);
    });
  }
  editTask(id: string, name: string, numtel: string): void {
    this.taskService.updateTask(id, { name, numtel }).then(() => {
      console.log('número actualizado correctamente');
    }).catch(error => {
      console.error('Error al actualizar número:', error);
    });
  }
  toggleCompleted(id: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement; 
    const completed = inputElement.checked;
  
    this.taskService.updateTask(id, { completed }).then(() => {
      console.log('Estado de número actualizado');
    }).catch(error => {
      console.error('Error al actualizar estado:', error);
    });
  }
  async logout(){
    await this.auth.logout();
    this.router.navigateByUrl('home');
  }
}