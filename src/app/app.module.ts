import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PackagesMenuComponent } from './packages-menu/packages-menu.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { LoginComponent } from './login/login.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { FormsModule } from '@angular/forms';
import { LoginGuardService } from './services/login-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  { path: 'Packages', component: PackagesMenuComponent , canActivate : [LoginGuardService] },
  { path: 'SignUp', component: CreateAccountComponent },
  { path: 'UploadPackage', component: UploadFilesComponent , canActivate : [LoginGuardService] },
  { path: 'PackageDetails/:id', component: PackageDetailsComponent , canActivate : [LoginGuardService] },
  { path: 'Login', component : LoginComponent},
  { path: '',   redirectTo: '/Login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    PackagesMenuComponent,
    PackageDetailsComponent,
    LoginComponent,
    UploadFilesComponent,
    
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
