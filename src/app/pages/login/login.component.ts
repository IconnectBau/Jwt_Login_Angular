import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
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
  constructor(private http: HttpClient, private router: Router){}

  error = new Subject<string>();

  onSignUp(user: {studentID: string, password: string}){
    console.log(user);
    const headers = new HttpHeaders({'Login': 'BAUPortal'});
    this.http.post<{name: string}>(
        'https://library-14e9e-default-rtdb.firebaseio.com/user.json', 
        user, {headers: headers})
        .subscribe((res) => {
            console.log(res);
            this.router.navigateByUrl('/dashboard'); 

        }, (err) => {
            this.error.next(err.message);
        });
      
}

  
  onLogin() {

 
   
    this.http.post<{name: string}>(
        'https://library-14e9e-default-rtdb.firebaseio.com/user.json', 
        this.loginObj)
        .subscribe((res) => {
            console.log(res);
            alert('login Success');
            this.router.navigateByUrl('/dashboard'); 

        }, (err) => {
            this.error.next(err.message);
        });

    // this.http.post('https://library-14e9e-default-rtdb.firebaseio.com/user.json', this.loginObj).subscribe((res:any)=>{
    //   console.log(res);
    //   if(res.result) {
    //     alert('login Success');
    //     localStorage.setItem('loginTOken', res.data.token);
    //     this.router.navigateByUrl('/dashboard'); 
    //   } else {
    //     alert(res.message);
    //   }
    // })
  }


}

