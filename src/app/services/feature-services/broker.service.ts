import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class BrokerService {
    constructor(private http: HttpClient) {}

    getAllBrokers(): Observable<any> {
        return this.http.get('/api/v1/broker');
    }
}
