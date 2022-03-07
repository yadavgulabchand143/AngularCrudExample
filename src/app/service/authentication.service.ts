import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  authenticate(username:string, password:string) {
  console.log('In AuthenticationService -  login');
  console.log('Http Url : ',this.baseUrl + 'login');
 return this.http.post<any>(this.baseUrl + 'login', 
 {userName: username, password:password}, {headers,responseType: 'json'})
 .pipe(catchError(this.handleError),
   map(userData => {
     console.log("User Details :: ", userData);
     if(userData){
      sessionStorage.setItem("username", userData.userName);
      return userData;
     }else{
      return false;
     }
   })
 ); 
}

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }


  private handleError(httpError: HttpErrorResponse) {
    let message:string = '';

    if (httpError.error instanceof ProgressEvent) {
      console.log('in progrss event')
      message = "Network error";
    }
    else {
      message = httpError.error.message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(message);
  }

}
