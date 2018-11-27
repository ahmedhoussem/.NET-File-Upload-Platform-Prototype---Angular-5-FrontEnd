import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  public Username : string;
  public Password : string;

  constructor(private toastr : ToastrService , private us : UserService , private Router : Router) { }

  ngOnInit() {

  }

  CanCreate() : boolean
  {
    if(this.Username && this.Password )
    {
      return true;
    }
    return false;
  }

  public AddUser()
  {
    this.us.AddUser({Username : this.Username , Password : this.Password}).subscribe(data =>
      {
        let content = data as any;
        
        if(content.Success == true)
        {
          this.toastr.success("You account has been created sucessfully", "Account created");
          this.Router.navigate(['/Login']);
          return;
        }
        this.toastr.warning( content.Data , "Error");
        console.log(content.Data , "Error : " );

      })
  }

}
