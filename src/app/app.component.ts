import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { LoginGuardService } from './services/login-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mitigram-Front-End';

  /**
   *
   */
  constructor(private us : UserService ) {
    
  }

  public isConnected() : boolean
  {
    return this.us.isConnected();
  }
  public Disconnect()
  {
    this.us.DisconnectUser();
  }

}
