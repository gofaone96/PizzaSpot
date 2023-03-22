import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthusersService {
  register(name: string, email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  //auth
  postData(data: any) {
    return this.http.post('http://localhost:8080/register', data);
  }
  loginData(data: any) {
    return this.http.post('http://localhost:8080/login', data);
  }

  forgotPassword(data:any){
    return this.http.post('http://localhost:8080/account/forgotPassword', data);
  }
  //saving data
  saveToken(token: string) {
    sessionStorage.setItem('key', token);
  }
}