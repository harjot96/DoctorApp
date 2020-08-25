import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Http, HttpModule, RequestOptions, Headers } from "@angular/http";
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  subcaategoryData:any='';
  Latitude:any=0;
  longitude:any=0;
  cat_id:any='';
  constructor(public http:HttpClient) 
  
  {

  }
  // otp(endpoint:any, data:object){
  //   const headers = new Headers();
  //   headers.append('Authorization', 'Bearer ' + data['token']);
  //   headers.append('Accept', 'application/json');
  //   headers.append('Content-Type', 'application/json');
  //   const options = new RequestOptions({ headers: headers });
  //   return this.http.post(`${environment.api_url}/${endpoint}`,
  //     { data},options )
  //   .pipe(tap(resData=>{
  //     return resData; 
     
  //    }));
  // }
  otp(endpoint,data)
  {
    let headers = new HttpHeaders();
    headers.append( 'Access-Control-Allow-Origin', '*',)
    headers.append( 'Content-Type', 'application/json')
    return this.http.post(`${environment.api_url}/${endpoint}`,data ,{headers:headers});
  }
  
  Signup(endpoint,data){
    // debugger
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