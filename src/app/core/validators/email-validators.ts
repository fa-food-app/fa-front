import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  private authService: AuthService = inject(AuthService);

  validate(control: AbstractControl): Observable<ValidationErrors | null>  {
    if(!control.value){
        return of(null);
      }
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        this.authService.checkEmail(email).subscribe({
            next:(user)=> {
                if ( email === user.email) {
                    subscriber.next({ emailTaken: true });
                    subscriber.complete();
                  }
                  subscriber.next(null);
                  subscriber.complete();
            }
        })
      }
    ).pipe(delay(2000));

    return httpCallObservable;
  }
}
