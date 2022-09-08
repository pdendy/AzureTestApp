import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanService } from '../plan/plan.service';
import { DeviceService } from './device.service';
import { Device } from './device';
import { Plan } from '../plan/plan';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


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

  addDevice(deviceNum:number, device_name:string){
    if(deviceNum == 1){
      this.devices[0].name += '-'
      this.devices[0].name += device_name
      this.deviceService.createDevice(this.devices[0]).subscribe()
    }
    if(deviceNum == 2){
      this.devices[1].name += '-'
      this.devices[1].name += device_name
      this.deviceService.createDevice(this.devices[1]).subscribe()
    }
    if(deviceNum == 3){
      this.devices[2].name += '-'
      this.devices[2].name += device_name
      this.deviceService.createDevice(this.devices[2]).subscribe()
    }
  }
}
