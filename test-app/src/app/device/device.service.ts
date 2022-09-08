import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device }  from './device';
import { DeviceDTO } from './device-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private apiUrl: string; 
  private httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    };

  constructor(
    private http: HttpClient,
   
      ) { 
    this.apiUrl = `${environment.apiUrl}/Devices`;
  }

  getAllDevices(id: string):Observable<Device[]>{
    return this.http.get<Device[]>(this.apiUrl + '?id=' + id)
  }
  getDevice(id: string): Observable<Device> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<Device>(url);
  }
  createDevice(deviceDTO: DeviceDTO) {
    console.log('inCreateDEvice')
    var creation = this.http.post<DeviceDTO>(this.apiUrl, deviceDTO, this.httpOptions);
    console.log(creation)
    return creation
  }

  swapDeviceNumbers(id1:string, id2:string){
    return this.http.put<Device>(this.apiUrl + '/' + id1 + '/with/' + id2, null);
  }

  addDeviceToPlan(deviceId: string, planId:string){
    return this.http.put<Device>(this.apiUrl + '/'+deviceId+'?planId='+planId,null)
  }

  updateDevice(device: Device): Observable<Device> {
    let url = `${this.apiUrl}/${device.id}`;
    return this.http.put<Device>(url, device);
  }
  deleteDevice(id: string): Observable<Device> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete<Device>(url);
  }
}
