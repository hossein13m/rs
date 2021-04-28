import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private router: Router, private alertService: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const contentType = request.headers.get('Content-Type');
        if (contentType === 'multipart/form-data') {
            return next.handle(request);
        }

        // Persian Number To EN
        if (request && request.body) {
            const strBody = JSON.stringify(request.body).replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
            const jsonBody = JSON.parse(strBody);
            request = request.clone({ body: jsonBody });
        }

        // add base url

        // TODO: this condition is temp:  request.url.startsWith(`http://172.21.255.236:3003`)
        // && !request.url.startsWith(`http://172.21.253.98:3003`)
        if (!request.url.startsWith(`${environment.serviceUrl}`)) {
            request = request.clone({ url: environment.serviceUrl + request.url });
        }

        // set Authorization header if any token exists in localstorage
        const identity = localStorage.getItem('accessToken');

        if (identity) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${identity}` } });
        }

        // set Content-Type and Accept header if it is not set before

        if (!contentType) {
            request = request.clone({ setHeaders: { contentType: `application/json` } });
        }

        const accept = request.headers.get('Accept');
        if (!accept) {
            request = request.clone({ setHeaders: { Accept: `application/json` } });
        }

        return next.handle(request).pipe(catchError((e) => this.checkErrors(e)));
    }

    checkErrors(e): Observable<never> {
        switch (e.status) {
            case 500:
                this.alertService.onError('اجرای درخواست موفق نبود.');
                break;
            default:
                break;
        }
        return throwError(e);
    }
}
