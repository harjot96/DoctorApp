import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient) 
  
  {

  }


  Signup(endpoint,data)
  {
    debugger
    let headers = new HttpHeaders();
    headers.append( 'Access-Control-Allow-Origin', '*',)
    return this.http.post(`${environment.api_url}/${endpoint}`,data,{headers:headers});

  }
  
  post(endpoint,data)
  {
    let headers = new HttpHeaders();
    headers.append( 'Access-Control-Allow-Origin', '*',)
    return this.http.post(`${environment.api_url}/${endpoint}`,data,{headers:headers});


  }
}