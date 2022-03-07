import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = ''
  password:string = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe((data:any)=>{
        if(data.userName){
          alert("User Login Successfully.")
          this.router.navigate(['/home'])
          this.invalidLogin = false
        }else{
          alert("Invalid User.")
          this.invalidLogin = true
        }
        
      },
      error=>{
          console.log(error);
          this.invalidLogin = true
      }
    )

  }

}

