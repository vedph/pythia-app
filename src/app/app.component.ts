import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthJwtService, GravatarService, User } from '@myrmidon/auth-jwt-login';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user$: Observable<User | null>;

  constructor(private _router: Router,
    private _authService: AuthJwtService,
    private _gravatarService: GravatarService) {
    this.user$ = _authService.currentUser$;
  }

  public getGravatarUrl(email: string, size = 80): string | null {
    return this._gravatarService.buildGravatarUrl(email, size);
  }

  public logout(): void {
    this._authService
      .logout()
      .pipe(take(1))
      .subscribe((_) => {
        this._router.navigate(['/home']);
      });
  }
}
