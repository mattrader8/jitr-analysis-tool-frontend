import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LcatLevel } from "../models/lcat-level.model";


@Injectable({
    providedIn: 'root'
})
export class LcatLevelService {
    private baseURL = "http://localhost:8080/api/v1/lcat-levels";

    constructor(private httpClient: HttpClient) { }

    getLcatLevelList(): Observable<LcatLevel[]> {
        return this.httpClient.get<LcatLevel[]>(`${this.baseURL}`);
    }

    addLcatLevel(lcatLevel: LcatLevel): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, lcatLevel);
    }
}