import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanService } from './plan.service';

import { Plan } from './plan';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  // addPlan(plan: Plan): Observable<Plan> {
  //   return this.http.put<Plan>(this.apiUrl)
  // }

  // deletePlan(plan: Plan) {
  //   this.plan = this.plans.filter(p => !== plan)
  // } 

}
