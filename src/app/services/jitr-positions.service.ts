import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JitrPositions } from "../models/jitr-positions.model";

@Injectable({
    providedIn: 'root'
})
export class JitrPositionsService {
    private baseURL = "http://localhost:8080/api/v1/jitr-positions";

    constructor(private httpClient: HttpClient) { }

    getJitrPositionsList(): Observable<JitrPositions[]> {
        return this.httpClient.get<JitrPositions[]>(`${this.baseURL}`);
    }

    getJitrPositionsByJitrNumber(jitrNumber: number): Observable<JitrPositions[]> {
        return this.httpClient.get<JitrPositions[]>(`${this.baseURL}/${jitrNumber}`);
    }

    addJitrPositions(jitrPositions: JitrPositions): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, jitrPositions);
    }

    updateJitrPositions(jitrPositionsID: string, jitrPositions: JitrPositions): Observable<Object> {
        return this.httpClient.put(`${this.baseURL}/${jitrPositionsID}`, jitrPositions);
    }

    deleteJitrPositions(jitrPositionsID: string): Observable<Object> {
        return this.httpClient.delete(`${this.baseURL}/${jitrPositionsID}`);
    }
}