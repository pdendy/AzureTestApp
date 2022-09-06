import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan }  from './plan';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl: string; 

  constructor( 
    private http: HttpClient
  ){
    this.apiUrl = `${environment.apiUrl}/Plan`;
   }

  getPlan(id: number): Observable<Plan> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<Plan>(url);
  }
  createPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan);
  }
  updatePlan(plan: Plan): Observable<Plan> {
    let url = `${this.apiUrl}/${plan.id}`;
    return this.http.put<Plan>(url, plan);
  }
  deletePlan(id: number): Observable<Plan> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete<Plan>(url);
  }
}
