import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanService } from '../plan/plan.service';
import { DeviceService } from './device.service';
import { Device } from './device';
import { Plan } from '../plan/plan';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices = [
    {accountId:"50311252",name:"Red Fish",phoneNumber:123456789},
    {accountId:"50311252",name:"Blue Fish",phoneNumber:123456789},
    {accountId:"50311252",name:"Green Fish",phoneNumber:123456789}
  ]
  constructor(
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
  }

  addDevice(deviceNum:number){
    if(deviceNum == 1){
      this.deviceService.createDevice(this.devices[0])
    }
    if(deviceNum == 2){
      this.deviceService.createDevice(this.devices[1])
    }
    if(deviceNum == 3){
      this.deviceService.createDevice(this.devices[2])
    }
  }
}
