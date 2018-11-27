import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


const URL = 'http://localhost:49478/api/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient , private Router : Router) { }

  public AddUser(User : any)
  {
      return this.http.post(URL , User);
  }
  public LoginUser(User : any)
  {
    return this.http.post(URL + "/Login" , User);
  }

  public isConnected() : boolean
  {
    let Token = localStorage.getItem("MitigramToken");

    if(Token)
      return true;
    else
      return false;

  }

  public DisconnectUser()
  {
    localStorage.removeItem("MitigramToken");
    this.Router.navigate(["/Login"]);
  }
}
