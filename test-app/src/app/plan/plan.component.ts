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
  _accountId = localStorage.getItem('id')
  plans = [
    {accountId: '50311252', name:'Thing 1', price:20, deviceLimit:1},
    {accountId: '50311252', name:'Thing 2', price:30, deviceLimit:2},
    {accountId: '50311252', name:'Thing 3', price:40, deviceLimit:3}
  ]

  constructor(
    private planService:PlanService
  ) { }

  ngOnInit(): void {
  }

  addPlan(planNum:number){
    if(planNum == 1){
      this.planService.createPlan(this.plans[0]).subscribe();
    }
    if(planNum == 2){
      this.planService.createPlan(this.plans[1]).subscribe();
    }
    if(planNum == 3){
      this.planService.createPlan(this.plans[2]).subscribe();
    }
  }
  

  // deletePlan(plan: Plan) {
  //   this.plan = this.plans.filter(p => !== plan)
  // } 

}
