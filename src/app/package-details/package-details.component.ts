import { Component, OnInit } from '@angular/core';
import { PackageService } from '../services/package.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

  public FilesList: any[];

  PackageName : string;
  CreationDate : string;
  FileCount : number;

  constructor(private ps: PackageService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.GetPackageById(params['id']).subscribe(data => {
        this.FilesList = data as any[];
      })
    });

    this.route.params.subscribe(params => {
      this.ps.GetPackageDetails(params['id']).subscribe(data => {
        let content = data as any;

        this.PackageName = content.Name;
        this.CreationDate = content.CreationTime;
        this.FileCount = content.FilesCount;
      })
    });
  }

  DownloadFile(item : any) {
    return this.http
      .get("http://localhost:49478/api/File/Download/"+item.Id, { responseType: 'blob', observe: 'body' })
      .subscribe(res => {
        console.log('start download:', res);
        var url = window.URL.createObjectURL(res);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = item.Filename ;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }, error => {
        console.log('download error:', JSON.stringify(error));
      }, () => {
        console.log('Completed file download.')
      });
  }

}
