import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUserList(): Observable<any> {
    return this._http.get('https://jsonplaceholder.typicode.com/users');
  }

  addUser(data: any): Observable<any> {
    return this._http.post('https://jsonplaceholder.typicode.com/users', data);
  }

  updateData(id: number, data: any): Observable<any> {
    return this._http.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

}
