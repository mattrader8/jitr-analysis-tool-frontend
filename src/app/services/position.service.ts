import { HttpClient } from "@angular/common/http";
import { Position } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LcatService {
    private baseURL = "http://localhost:8080/api/v1/positions";

    constructor(private httpClient: HttpClient) { }

    getPositionList(): Observable<Position[]> {
        return this.httpClient.get<Position[]>(`${this.baseURL}`);
    }

    getDistinctLCATList(): Observable<Object[]> {
        return this.httpClient.get<Object[]>(`${this.baseURL}` + '/lcats');
    }

    getLCATLevelListByLCATDescription(lcatDescription: string): Observable<Object[]> {
        return this.httpClient.get<Object[]>(`${this.baseURL}/${lcatDescription}`);
    }

    addLcat(position: Position): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, position);
    }
}