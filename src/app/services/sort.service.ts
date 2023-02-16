import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }
  private keyWord: string = 'todoSort';
  sort: boolean = true;

  sortArrayByLocalStorage(tasks: Task[]) {
    try {
      const sort = localStorage.getItem(this.keyWord);
      if(sort === "AlphabetAsc") {
        this.sortArrayByAlphabetAsc(tasks);
        this.sort = false;
      }
      else if(sort === "AlphabetDesc"){
        this.sortArrayByAlphabetDesc(tasks);
        this.sort = true;

      }
      else if(sort === "TimeAsc"){
        this.sortArrayByTimeAsc(tasks);
        this.sort = true;

      }
      else if(sort === "TimeDesc") {
        this.sortArrayByTimeDesc(tasks);
        this.sort = false;
      }
      else if(sort === "CompleteFirst") {
        this.sortArrayByCompleteFirst(tasks);
        this.sort = false;
      }
      else {
        this.sortArrayByCompleteLast(tasks);
        this.sort = true;

      }
      
    }
    catch(err) {

    }
  }

  sortArrayByCompleteFirst(tasks: Task[]) {
    tasks.sort(function sortBool(a: any, b: any) {
      return (a.done === b.done) ? 0 : b.done? 1 : -1;
    })
    this.sortArrayByImportant(tasks);

    localStorage.setItem(this.keyWord, "CompleteFirst");
  }

  sortArrayByCompleteLast(tasks: Task[]) {
    tasks.sort(function sortBool(a: any, b: any) {
      return (a.done === b.done) ? 0 : b.done? -1 : 1;
    })
    this.sortArrayByImportant(tasks);

    localStorage.setItem(this.keyWord, "CompleteLast");
  }

  sortArrayByAlphabetAsc(tasks: Task[]) {
    tasks.sort(function(a, b){
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
    })
    this.sortArrayByImportant(tasks);

    localStorage.setItem(this.keyWord, "AlphabetAsc");
  }

  sortArrayByAlphabetDesc(tasks: Task[]) {
    tasks.sort(function(a, b){
      if(a.title < b.title) { return 1; }
      if(a.title > b.title) { return -1; }
      return 0;
    })
    this.sortArrayByImportant(tasks);
    localStorage.setItem(this.keyWord, "AlphabetDesc");
  }

  sortArrayByTimeAsc(tasks: Task[]) {
    tasks.sort(function(a, b){
      if(a.date! < b.date!) { return -1; }
      if(a.date! > b.date!) { return 1; }
      return 0;
    })
    this.sortArrayByImportant(tasks);

    localStorage.setItem(this.keyWord, "TimeAsc");
  }

  sortArrayByTimeDesc(tasks: Task[]) {
    tasks.sort(function(a, b){
      if(a.date! < b.date!) { return 1; }
      if(a.date! > b.date!) { return -1; }
      return 0;
    })
    this.sortArrayByImportant(tasks);
    localStorage.setItem(this.keyWord, "TimeDesc");
  }

  private sortArrayByImportant(tasks: Task[]) {
    tasks.sort(function sortBool(a: any, b: any) {
      return (a.important === b.important) ? 0 : b.important? 1 : -1;
    })
  }



}
