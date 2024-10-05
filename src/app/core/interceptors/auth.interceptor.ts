import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthFacadeService} from "../facade/auth-facade.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authFacade: AuthFacadeService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authFacade.getToken()) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authFacade.getToken()}`)
      })
    }
    return next.handle(request);
  }
}
