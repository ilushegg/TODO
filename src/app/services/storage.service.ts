import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  keyWord = 'todoImg'

  constructor() { }
  private imgPath = 'assets/images/night-bg.jpg';

  getCurrentImagePath(): string {
    let imgPath = localStorage.getItem(`${this.keyWord}Current`)!;
    if (!imgPath) {
      this.setDefaultImagePath();
      return this.imgPath;
    }
    return JSON.parse(imgPath);
  }

  private setDefaultImagePath() {
    localStorage.setItem(this.keyWord, JSON.stringify(this.imgPath));
  }

  setCurrentImagePath(url: string) {
    this.imgPath = url;
    localStorage.setItem(`${this.keyWord}Current`, JSON.stringify(this.imgPath));
  }

  allStorage(keyWord: string) {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      if (keys[i].includes(keyWord)) {
        values.push(JSON.parse(localStorage.getItem(keys[i])!));
      }
    }
    return values;
  }
}


