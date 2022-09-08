import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, PopupRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

type ProfileType = {
  id?: string
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Seuss Signals';
  isIframe = false;
  loginDisplay = false;
  profile!:ProfileType
  private readonly _destroying$ = new Subject<void>();
  id:number = +localStorage.getItem('id')!
  constructor(
    @Inject(MSAL_GUARD_CONFIG) 
    private msalGuardConfig: 
    MsalGuardConfiguration, 
    private broadcastService: MsalBroadcastService, 
    private authService: MsalService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    
    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })


  }

  login() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe({
          next: (result:any) => {
            console.log(result);
            this.setLoginDisplay();
            this.authService.instance.setActiveAccount(result)
            var id = result.account?.id
            localStorage.setItem('id', '' + id)
          },
          error: (error:any) => console.log(error)
        });
    } else {
      this.authService.loginPopup()
        .subscribe({
          next: (result:any) => {
            console.log(result);
            this.setLoginDisplay();
            this.authService.instance.setActiveAccount(result)
            var id = result.account?.id
            localStorage.setItem('id', '' + id)
          },
          error: (error:any) => console.log(error)
        });
    }
  }

  logout() { // Add log out function here
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
    localStorage.removeItem('id')

  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
