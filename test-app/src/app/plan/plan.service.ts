import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan }  from './plan';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../profile.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl: string; 

  constructor( 
    private http: HttpClient,
    private profileService: ProfileService
  ){
    this.apiUrl = `${environment.apiUrl}/Plans`;
   }

  getPlan(planId: string): Observable<Plan> {
    var id = localStorage.getItem('id')
    return this.http.get<Plan>(this.apiUrl +'/'+id+'/PlanId/'+planId);
  }

  getAllPlans(): Observable<Plan[]> {
    var id = localStorage.getItem('id')
    return this.http.get<Plan[]>(this.apiUrl+'/'+ '50311252');
  }

  getAvailablePlans(): Observable<Plan[]> {
    var id = localStorage.getItem('id')
    return this.http.get<Plan[]>(this.apiUrl+'/'+'50311252'+'/Available');
  }

  getBillByAccount(id:string): Observable<number>{
    var bill = this.http.get<number>(this.apiUrl + '/' + id + 'Bill');
    return bill;
  }
  createPlan(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(this.apiUrl, plan);
  }
  updatePlan(plan: Plan): Observable<Plan> {
    let url = `${this.apiUrl}/${plan.id}`;
    return this.http.put<Plan>(url, plan);
  }

  deletePlan(accountId: string, id: string): Observable<Plan> {
    return this.http.delete<Plan>(this.apiUrl + '/' + accountId + '/plan/' + id);
  }
}
