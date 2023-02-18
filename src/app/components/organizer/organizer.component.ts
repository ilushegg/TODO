import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { switchMap, Observable } from 'rxjs';
import { DateService } from 'src/app/services/date.service';
import { SortService } from 'src/app/services/sort.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form = this.formBuilder.group({
    title: new FormControl('', [Validators.required, Validators.maxLength(150)])
  })

  editForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(150)]]
  })
  task: Task = {
    title: '',
    done: false,
    important: false
  };

  tasks: Task[] = [];

  isVisibleModal = false;


  constructor(private dateService: DateService, private taskService: TaskService, private formBuilder: FormBuilder, private sortService: SortService, private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(res => {
      this.tasks = res;
      this.sortService.sortArrayByLocalStorage(this.tasks);
    })
  }


  add() {
    if (this.form.invalid) {
      const controlErrors: ValidationErrors = this.form.controls.title.errors!;
      if (controlErrors['required']) {
        this.nzMessageService.info("Поле не должно быть пустым.");
      }
      else {
        this.nzMessageService.info("Поле не должно содержать более 150 символов.");
      }
      return;
    }
    const task: Task = {
      title: this.form.controls.title.value!,
      date: this.dateService.date.value.format('DD-MM-YYYY HH:mm:ss'),
      done: false,
      important: false,
    }

    this.taskService.create(task).subscribe(res => {
      this.tasks.unshift(res);
      this.form.reset();
    });
    this.sortService.sortArrayByLocalStorage(this.tasks);
  }

  remove(task: Task) {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }
    );
    this.sortService.sortArrayByLocalStorage(this.tasks);
  }

  check(task: Task) {
    this.taskService.edit(task).subscribe(res => {
      this.sortService.sortArrayByLocalStorage(this.tasks);
    });
  }

  removeCompleted() {
    this.tasks.forEach(task => {
      if (task.done) {
        this.taskService.remove(task).subscribe();
      }
    });
    this.tasks = this.tasks.filter(t => !t.done)
    this.sortService.sortArrayByLocalStorage(this.tasks);
  }

  markImportant(task: Task) {
    task.important = !task.important;
    this.taskService.edit(task).subscribe(res => {
      this.sortService.sortArrayByLocalStorage(this.tasks);
    });
  }

  moveUncompleted() {
    this.tasks.forEach(task => {
      if (!task.done) {
        const date = moment(task.date, 'DD-MM-YYYY').add(1, 'd');
        task.date = date.format('DD-MM-YYYY');
        this.taskService.edit(task).subscribe(res => {
          this.tasks = this.tasks.filter(t => t != task);

        })
      }
    });
  }

  sortByCompleted() {
    if (this.sortService.sort) {
      this.sortService.sortArrayByCompleteFirst(this.tasks);
    }
    else {
      this.sortService.sortArrayByCompleteLast(this.tasks);
    }
    this.sortService.sort = !this.sortService.sort
  }

  sortByTime() {
    if (this.sortService.sort) {
      this.sortService.sortArrayByTimeAsc(this.tasks);
    }
    else {
      this.sortService.sortArrayByTimeDesc(this.tasks);
    }
    this.sortService.sort = !this.sortService.sort
  }

  sortByAlphabet() {
    if (this.sortService.sort) {
      this.sortService.sortArrayByAlphabetAsc(this.tasks);
    }
    else {
      this.sortService.sortArrayByAlphabetDesc(this.tasks);
    }
    this.sortService.sort = !this.sortService.sort
  }



  showModal(task: Task): void {
    this.editForm.patchValue({
      title: task.title
    })
    this.isVisibleModal = true;
    this.task = task;
    console.log(task)
  }



  edit(): void {
    if (this.editForm.invalid) {
      this.nzMessageService.info("Поле не должно быть пустым.");
      return;
    }
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






