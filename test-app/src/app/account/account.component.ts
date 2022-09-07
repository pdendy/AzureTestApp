import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { PlanService } from '../plan/plan.service';
import { DeviceService } from '../device/device.service';
import { Route } from '@angular/router';
//import {NestedTreeControl} from '@angular/cdk/tree';
//import {MatTreeNestedDataSource} from '@angular/material/tree';

import { Account } from './account';
import { Plan } from '../plan/plan';
import { Device } from '../device/device';

const WebAPI_ENDPOINT = 'api://https://telecom-project-api.azurewebsites.net/api/Accounts/access-as-user';

//need to check schema

type AccountType = {
  id?: '', 
  username?: '',
  password?: ''
};

// interface BillingNode{
//   name: string;
//   children?: BillingNode[];
// }

// const BILLING_DATA: BillingNode[] = [
//   {
//     name:'Plans',
//     children:[Plan.name, ]
//   }, 
//   {
//     name:'Devices',
//     children:[]
//   },
// ]

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

 // treeControl = new NestedTreeControl<BillingNode>(node => node.children);
 // dataSource = new MatTreeNestedDataSource<BillingNode>();

  account!: AccountType;
  total!: number;

  accounts: Account[] = [];
  plans: Plan[] = [];
  devices: Device[] = [];

  constructor(
    private http: HttpClient, 
    private accountService: AccountService,
    private planService: PlanService,
    private deviceService: DeviceService
   // private router: Route
   // this.dataSource.data = BILLING_DATA;
  ) { }

 // hasChild = (_: number, node: BillingNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.getPlans();
    this.total = this.getTotal(this.plans);
  }

  getAccount() {
    this.http.get(WebAPI_ENDPOINT)
      .subscribe(account => {
        this.account = account;
      });
  }

  getPlans() {
    this.planService.getAllPlans('50311252')
      .subscribe(plans => {
        this.plans = plans;
      })
  }

  getTotal(plans: Plan[]) {
    let total = 0;
    plans.forEach(function(plan){
      total+=plan.price;
    })
    return total
  }
}
