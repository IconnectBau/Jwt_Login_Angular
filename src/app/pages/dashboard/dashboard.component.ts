import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, throwError } from 'rxjs';
import { user } from 'src/app/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any[]=[];
  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
  
    this.loadUsers();  
    console.log(this.users)
  }


  logOut(){
    this.router.navigateByUrl('/login'); 
  }



  private loadUsers(){
    this.http.get<{[key: string]:user}>(
      'https://loginpage-bc092-default-rtdb.firebaseio.com/users.json'
    )
      .pipe(map((response) => {
        const data = [];
       
        for(const key in response){
          if(response.hasOwnProperty(key)){
            data.push({...response[key], id:key})
           

          }
          
        }
        return data;
      }))
      .subscribe((data) => {
        this.users=data;
    
      })
  }



}
