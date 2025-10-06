import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private dataUrl = 'assets/company.json';

  constructor(private http: HttpClient) { }

  getCompanyData(): Observable<Company> {
    return this.http.get<Company>(this.dataUrl);
  }
}