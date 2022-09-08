import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile!:ProfileType

  constructor(
    private http: HttpClient
  ) { }

  getMe(){
    this.http.get('graph.microsoft.com/v1.0/me')
      .subscribe((profile:any) => {
        this.profile = profile;
      });
      return this.profile;
  }
}
