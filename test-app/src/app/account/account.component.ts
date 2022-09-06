import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { Route } from '@angular/router';
//import {NestedTreeControl} from '@angular/cdk/tree';
//import {MatTreeNestedDataSource} from '@angular/material/tree';

import { Account } from './account';
import { Plan } from '../plan/plan';
import { Device } from '../device/device';

const WebAPI_ENDPOINT = 'api://<https://telecom-project-api.azurewebsites.net/api/Accounts>/access-as-user';

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

  accounts: Account[] = [];

  constructor(
    private http: HttpClient, 
    private accountService: AccountService,
    private router: Route
   // this.dataSource.data = BILLING_DATA;
  ) { }

 // hasChild = (_: number, node: BillingNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    this.http.get(WebAPI_ENDPOINT)
      .subscribe(account => {
        this.account = account;
      });
  }

  //update Account

}
