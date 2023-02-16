import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import {v4 as guid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] | undefined = [];
  keyWord = 'todoID';

  constructor() { }

  load(date: moment.Moment): Observable<Task[]> {
    this.tasks = allStorage(this.keyWord);
    console.log(this.tasks)
    console.log(date)
    this.tasks = this.tasks.filter(t => t.date?.includes(date.format('DD-MM-YYYY')));
    return of(this.tasks);
  }

  create(task: Task): Observable<Task> {
    task.id = guid();
    localStorage.setItem(`${this.keyWord} ${task.id}`, JSON.stringify(task));
    return of(task);
  }

  remove(task: Task): Observable<void>{
    localStorage.removeItem(`${this.keyWord} ${task.id}`);
    return of(void 0);
  }

  edit(task: Task): Observable<Task>  {
    localStorage.setItem(`${this.keyWord} ${task.id}`, JSON.stringify(task));
    return of(task);
  }

  
}

function allStorage(keyWord: string) {

  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
    if(keys[i].includes(keyWord)){
      values.push(JSON.parse(localStorage.getItem(keys[i])!) );
    }
  }

  return values;
}
