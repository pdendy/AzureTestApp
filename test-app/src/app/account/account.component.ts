import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { PlanService } from '../plan/plan.service';
import { DeviceService } from '../device/device.service';
import { ProfileService } from '../profile.service';

import { FormsModule, FormControl } from '@angular/forms';

//import { Route } from '@angular/router';
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
  bill!: number;
  selectFormControl = new FormControl('');
  selectedPlan!:string;
  accounts: Account[] = [];
  plans: Plan[] = [];
  availPlans: Plan[] = [];
  devices: Device[] = [];

  constructor(
    private http: HttpClient, 
    private accountService: AccountService,
    private planService: PlanService,
    private deviceService: DeviceService,
    private profileService: ProfileService
   // private router: Route
   // this.dataSource.data = BILLING_DATA;
  ) { }

 // hasChild = (_: number, node: BillingNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.getPlans();
    this.getAvailablePlans();
    this.getDevices();
  }

  // getAccount() {
  //   this.http.get(WebAPI_ENDPOINT)
  //     .subscribe(account => {
  //       this.account = account;
  //     });
  // }

  getPlans() {
    this.planService.getAllPlans()
      .subscribe((plans:Plan[]) => {
        this.plans = plans;
      })
  }

  getAvailablePlans(){
    this.planService.getAvailablePlans()
    .subscribe((availPlans:Plan[]) => {
      this.availPlans = availPlans
    })
  }

  getPlanName(planId:string){
    var name = ''
    this.planService.getPlan(planId)
    .subscribe((p:Plan) => {
      name = p.name
    })
    return name
  }

  assignDeviceToPlan(deviceId: string, planId:string){
    this.deviceService.addDeviceToPlan(deviceId, planId).subscribe();
  }

  getDevices() {
    this.deviceService.getAllDevices('50311252')
      .subscribe((devices:Device[]) => {
        this.devices = devices;
        this.devices.forEach(device => {
          if(device.planId == null){
            device.planId = 'No Plan Yet'
          }
        });
      })
  }


  getBill(plans:Plan[]) {
    var total = 0;
    plans.forEach(function (plan) {
      total += plan.price
    }
    )
    return total
    
  }

  deletePlan(id:string){
    this.planService.deletePlan('50311252', id).subscribe(() =>
      this.plans = this.plans.filter(plans => plans.id != id)
  )}

  deleteDevice(id:string){
    this.deviceService.deleteDevice(id).subscribe(() =>
    this.devices = this.devices.filter(devices => devices.id != id)
  )}

  swapDeviceNumbers(name1:string, name2:string){
    var id1 = ''
    var id2 = ''
    this.devices.forEach(device => {
      if(device.name == name1){
        id1 = device.id!
      }
      if(device.name == name2){
        id2 = device.id!
      }
    });
    this.deviceService.swapDeviceNumbers(id1, id2).subscribe()
    this.planService.getAllPlans()
      .subscribe((plans: Plan[]) => {
        this.plans = plans;
      })
  }
}
