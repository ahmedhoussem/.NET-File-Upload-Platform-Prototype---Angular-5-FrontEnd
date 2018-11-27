import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

const URL = 'http://localhost:49478/api/'


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  public PostPackage(fd: FormData) {
    const headers = new HttpHeaders({ 'Authorization' : localStorage.getItem("MitigramToken") });

    const req = new HttpRequest('POST', URL+"Package", fd , {
      reportProgress: true,
      headers : headers
    });

    return this.http.request(req);
  }

  public GetPackageDetails(id : number)
  {
    const headers = new HttpHeaders({ 'Authorization' : localStorage.getItem("MitigramToken") });
    return this.http.get(URL+"Package/GetPackageDetails/"+ id , { headers : headers});
  }

  public GetPackages()
  {
    const headers = new HttpHeaders({ 'Authorization' : localStorage.getItem("MitigramToken") });

    return this.http.get(URL+ "Package/PerUser" , { headers : headers});
  }

  public GetPackageById(id : number)
  {
    const headers = new HttpHeaders({ 'Authorization' : localStorage.getItem("MitigramToken") });
    return this.http.get(URL+"File/"+ id , { headers : headers});
  }
}
