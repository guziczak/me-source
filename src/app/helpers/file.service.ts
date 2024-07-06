import { Injectable, OnInit } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  async fileExists(url: string): Promise<any> {
        return await this.http.get(url, { responseType: 'text' }).toPromise();
  }
  
  
}