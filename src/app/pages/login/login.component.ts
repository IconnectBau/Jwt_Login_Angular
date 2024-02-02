import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  loginObj: any = {
    "studentID": "",
    "password": ""
  };

  constructor(private http: HttpClient, private router: Router) { }

  error = new Subject<string>();

  onSignUp(user: { studentID: string, password: string }) {
    console.log(user);
    const headers = new HttpHeaders({ 'SignUp': 'BAUPortal' });
    this.http.post<{ name: string }>(
      'https://loginpage-bc092-default-rtdb.firebaseio.com/users.json',
      user, { headers: headers })
      .subscribe((res) => {
        console.log(res);
        alert('Sign Up Success');
        this.router.navigateByUrl('/dashboard');

      }, (err) => {
        this.error.next(err.message);
      });

  }


  onLogin(user: { studentID: string, password: string }) {
    console.log(user);
    const headers = new HttpHeaders({ 'Login': 'BAUPortal' });
    this.http.post<{ name: string }>(
      'https://loginpage-bc092-default-rtdb.firebaseio.com/users.json',
      user, { headers: headers })
      .subscribe((res) => {
        console.log(res);
        alert('Login Success');
        this.router.navigateByUrl('/dashboard');

      }, (err) => {
        this.error.next(err.message);
      });

  }


}

