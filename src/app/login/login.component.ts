import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Username: string;
  public Password: string;

  constructor(private toastr: ToastrService, private us: UserService, private Router: Router) { }

  ngOnInit() {
  }

  AddUser
  public LoginAction() {


    if (this.Username && this.Password) {

      this.us.LoginUser({ Username: this.Username, Password: this.Password })
        .subscribe(response => {
          let content = response as any;

          if (content.Success == true) {
            this.toastr.success('Successful Login ! Welcome '+ this.Username , 'Logged in');
            console.log(content.Data);

            localStorage.setItem("MitigramToken", content.Data.Token);
            this.Router.navigate(["/Packages"]);
            return;
          }

          this.toastr.error('Wrong credentials , try again !' , 'Error', );

          console.log(content.Data);

        });
    }
    else
    {
      this.toastr.error('Please provide username and password' , 'Error');
    }
  }

}
