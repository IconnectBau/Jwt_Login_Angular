import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { user } from 'src/app/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any[]=[];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
  
    this.loadUsers();  
    console.log(this.users)
  }



  private loadUsers(){
    this.http.get<{[key: string]:user}>(
      'https://library-14e9e-default-rtdb.firebaseio.com/user.json'
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
