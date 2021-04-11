import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JitrStatus } from "../models/jitr-status.model";

@Injectable({
    providedIn: 'root'
})
export class JitrStatusService {
    private baseURL = "http://localhost:8080/api/v1/jitr-statuses";

    constructor(private httpClient: HttpClient) { }

    getJitrStatusesList(): Observable<JitrStatus[]> {
        return this.httpClient.get<JitrStatus[]>(`${this.baseURL}`);
    }

    addJitrStatus(jitrStatus: JitrStatus): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, jitrStatus);
    }
}