import { Component, OnInit, ElementRef } from '@angular/core';
import { FileUploader, FileUploadModule, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { ViewChild } from '@angular/core';
import { PackageService } from '../services/package.service';
import { stringify } from '@angular/core/src/util';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';







@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})


export class UploadFilesComponent implements OnInit {


  ngOnInit(): void {

  }

  /**
   *
   */
  constructor(private ts : ToastrService , private ps : PackageService , private router : Router) {
    
  }

  @ViewChild('file')
  myInputVariable: ElementRef;

  name: string;
  FilesList: any[] = [];
  progress : number = 0;

  onChange(files: any) {
    this.FilesList.push(files[0])
    console.log(files[0]);
    this.myInputVariable.nativeElement.value = "";
  }

  removeFile(file: any) {
    var index = this.FilesList.indexOf(file);
    if (index > -1) {
      this.FilesList.splice(index, 1);
    }
  }

  UploadPackage() : void
  {
    var fd = new FormData();

    console.log("Name : " + this.name)
    fd.append("Name" , this.name );
    this.FilesList.forEach((element,index) => {
      fd.append(element.name , element , element.name );
    });

    this.ps.PostPackage(fd).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request sent!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
          break;
        case HttpEventType.Response:
          console.log('😺 Done!', event.body);
          if(event.body.Success == true)
          {
            this.ts.info( 'Redirected to your new package' , 'Upload Successful');
      
            this.router.navigate(['/PackageDetails' , event.body.Data.PackageId]);
          }
          else
          {
            this.ts.warning(event.body.Data , 'Upload Canceled')
            console.log("Error");
          }
      }
    });

  }

  CanUpload() : boolean
  {
    if(this.FilesList.length > 0 && this.name )
    {
      return true;
    }
    return false;
  }

}
