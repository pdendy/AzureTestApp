import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanService } from './plan.service';

import { Plan } from './plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  deletePlan(plan: Plan) {
    this.plans = this.plans.filter(p => !== plan)
  }

}
