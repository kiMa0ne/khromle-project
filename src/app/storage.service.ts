import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key)!)
  }

  clearData() {
    localStorage.clear()
  }

}
