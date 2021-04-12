import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl = environment.apiEndPoint;

  constructor(private api: HttpClient) { }

  getUsers(){
    return this.api.get<User[]>(this.baseUrl)
  }

  postUser(user: User){
    return this.api.post<User>(this.baseUrl,user)
  }

  putUser(user: User){
    return this.api.put<User>(this.baseUrl + '/' + user.userId, user)
  }
}
