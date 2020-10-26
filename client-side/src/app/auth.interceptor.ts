import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http"
import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'
import { Router } from "@angular/router"
import { UserService } from "./services/user.service"
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs'

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService, private router: Router) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('noauth')) {
            return next.handle(req.clone())
        }
        else {
            const clonedReq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            })
            return next.handle(clonedReq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            )
        }



    }
}
