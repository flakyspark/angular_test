import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * This class provides the WordList service with methods to read words
 */
@Injectable()
export class WordListService {

    /**
     * Creates a new WordListService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    constructor(private http: Http) {}

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {string[]} The Observable for the HTTP request.
     */
    get(): Observable<string[]> {
        return this.http.get('/main/getwords').map((res: Response) => res.json());
    }

    sendError(error): Observable<string[]> {
        let body = JSON.stringify(error);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/main/add_error', body, options)
            .map((res: Response) => res.json());
    }

}

