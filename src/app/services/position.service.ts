import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Position } from "../models/position.model";

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    private baseURL = "http://localhost:8080/api/v1/positions";

    constructor(private httpClient: HttpClient) { }

    getPositionList(): Observable<Position[]> {
        return this.httpClient.get<Position[]>(`${this.baseURL}`);
    }

    getDistinctLCATList(): Observable<string[]> {
        return this.httpClient.get<string[]>(`${this.baseURL}` + '/lcats');
    }

    getLCATLevelListByLCATDescription(lcatDescription: string): Observable<string[]> {
        return this.httpClient.get<string[]>(`${this.baseURL}/${lcatDescription}`);
    }

    getPositionIDByLCATAndLCATLevelDescriptions(lcatDescription: string, lcatLevelDescription: string): Observable<number> {
        return this.httpClient.get<number>(`${this.baseURL}/${lcatDescription}/${lcatLevelDescription}`);
    }

    addPosition(position: Position): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, position);
    }
}