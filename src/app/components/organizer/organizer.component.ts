import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
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

  form= this.formBuilder.group({
    title: new FormControl('', Validators.required)
  })

  editForm = this.formBuilder.group({
    title: ['', Validators.required]
  })
  task: Task = {
    title: '',
    done: false
  };

  tasks: Task[] = [];

  isVisibleModal = false;
  
  constructor(private dateService: DateService, private taskService: TaskService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(res => {
      this.tasks = res;
      this.sortArray();
    })
  }


  add() {
    const task: Task = {
      title:  this.form.controls.title.value!,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
      done: false
    }

    this.taskService.create(task).subscribe(res => {
      this.tasks.unshift(res);
      this.form.reset();
    });
    this.sortArray();
  }

  remove(task: Task){
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.error(err)
    );
    this.sortArray();
  }

  check(task: Task) {
    this.taskService.edit(task).subscribe(res => {
      this.sortArray();

    });
  }

  sortArray() {
    this.tasks.sort(function sortBool(a: any, b: any) {
      return (a.done === b.done) ? 0 : b.done? -1 : 1;
    })
  }

  showModal(task: Task): void {
    this.editForm.patchValue({
      title: task.title
    })
    this.isVisibleModal = true;
    this.task = task;
    console.log(task)

  }

  handleOk(): void {


    this.task.title = this.editForm.controls.title.value!;

    this.taskService.edit(this.task).subscribe(res => {

    });
    this.isVisibleModal = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleModal = false;
  }

}


  



