import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account }  from './account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl: string; 

  constructor( 
    private http: HttpClient
  ){
    this.apiUrl = `${environment.apiUrl}/Account`;
   }

  getAccount(id: string): Observable<Account> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<Account>(url);
  }
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }
  updateAccount(account: Account): Observable<Account> {
    let url = `${this.apiUrl}/${account.id}`;
    return this.http.put<Account>(url, account);
  }
  deleteAccount(id: number): Observable<Account> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete<Account>(url);
  }
}
