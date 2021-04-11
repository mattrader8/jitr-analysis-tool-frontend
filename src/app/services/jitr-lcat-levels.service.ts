import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JitrLcatLevels } from "../models/jitr-lcat-levels.model";


@Injectable({
    providedIn: 'root'
})
export class JitrLcatLevelsService {
    private baseURL = "http://localhost:8080/api/v1/jitr-lcat-levels";

    constructor(private httpClient: HttpClient) { }

    getJitrLcatLevelsList(): Observable<JitrLcatLevels[]> {
        return this.httpClient.get<JitrLcatLevels[]>(`${this.baseURL}`);
    }

    getJitrLcatLevelsByJitrNumber(jitrNumber: number): Observable<JitrLcatLevels[]> {
        return this.httpClient.get<JitrLcatLevels[]>(`${this.baseURL}/${jitrNumber}`);
    }

    getMaxJitrLcatLevelID(): Observable<number> {
        return this.httpClient.get<number>(`${this.baseURL}` + '/max-id');
    }

    addJitrLcatLevels(jitrLcatLevels: JitrLcatLevels): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, jitrLcatLevels);
    }
}