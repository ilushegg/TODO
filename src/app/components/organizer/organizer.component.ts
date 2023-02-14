import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, Observable } from 'rxjs';
import { DateService } from 'src/app/services/date.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  })
  tasks: Task[] = []
  
  constructor(private dateService: DateService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.load(this.dateService.date.value).subscribe(res => {
      this.tasks = res;
    })
    console.log(this.tasks[1].id)
    console.log(this.tasks)

  }


  submit() {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
      done: false
    }

    this.taskService.create(task).subscribe(res => {
      this.tasks.push(res);
      this.form.reset();
    });
  }

  remove(task: Task){
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
      console.log(this.tasks)
    }, err => console.error(err)
    );
  }

  check(task: Task) {
    this.taskService.edit(task);
  }

}
