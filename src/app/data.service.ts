import { Injectable } from '@angular/core';
import {Data} from './dataformat';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _url: string= ' https://cs251-outlab-6.herokuapp.com/initial_values/';
  private _url1: string= ' https://cs251-outlab-6.herokuapp.com/add_new_feedback/';
  constructor(private http: HttpClient) { };
getdata(): Observable<Data>{
  return this.http.get<Data>(this._url)
                  .pipe(catchError( this.errorHandler)) ;
} 
postdata(data: string): Observable<Data> {
  return this.http.post<Data>(this._url1, data)
                  .pipe(catchError(this.errorHandler));
   
}
errorHandler(error: HttpErrorResponse){
  return throwError(error);
  
}

}
