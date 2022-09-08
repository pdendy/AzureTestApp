import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { MsalGuard } from '@azure/msal-angular';
import { PlanComponent } from './plan/plan.component';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'account', component: AccountComponent,},
  { path: 'plans/:id', component: PlanComponent},
  { path: 'devices/:id', component:DeviceComponent}
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
