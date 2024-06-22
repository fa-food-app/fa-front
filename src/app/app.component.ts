import { AfterViewInit, Component, computed, effect, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from './core/services/auth.service';
import { AuthStatus } from './core/enum/auth-status';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  private authService = inject(AuthService);
  private router = inject(Router);
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        initFlowbite();

      }
    });
  }
  public finishedAuthCheck = computed<boolean>(()=>{
    if(this.authService.authStatus() === AuthStatus.CHECKING){
      return false;
    }
    return true;
  })

  public authStatusChangedEffect = effect(()=>{
    switch(this.authService.authStatus()){
      case AuthStatus.CHECKING: 
        return;
      case AuthStatus.AUTHENTICATED: 
        this.router.navigateByUrl('/admin/inicio') 
        return; 
      case AuthStatus.NOTAUTHENTICATED:
        this.router.navigateByUrl('/auth/login')
    }
  })
}
