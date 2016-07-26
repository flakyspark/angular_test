import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    /**
     * Creates a new UserService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    constructor(private http: Http) {}

    /**
     * Reset user session
     * @return {string[]} The Observable for the HTTP request.
     */
    resetUserData(): Observable<string[]> {
        return this.http.get('/main/reset_user').map((res: Response) => res.json());
    }

    /**
     * Sends user data to server
     * @param userStat
     * @returns {any}
     */
    sendUserStat(userStat): Observable<string[]> {
        let body = JSON.stringify(userStat);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/main/add_result', body, options)
            .map((res: Response) => res.json());
    }

}

