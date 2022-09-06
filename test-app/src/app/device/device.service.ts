import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device }  from './device';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private apiUrl: string; 

  constructor(
    private http: HttpClient) { 
    this.apiUrl = `${environment.apiUrl}/Device`;
  }

  getDevice(id: number): Observable<Device> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<Device>(url);
  }
  createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }
  updateDevice(device: Device): Observable<Device> {
    let url = `${this.apiUrl}/${device.id}`;
    return this.http.put<Device>(url, device);
  }
  deleteDevice(id: number): Observable<Device> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete<Device>(url);
  }
}
