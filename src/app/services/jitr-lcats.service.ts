import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JitrLcats } from "../models/jitr-lcats.model";


@Injectable({
    providedIn: 'root'
})
export class JitrLcatsService {
    private baseURL = "http://localhost:8080/api/v1/jitr-lcats";

    constructor(private httpClient: HttpClient) { }

    getJitrLcatsList(): Observable<JitrLcats[]> {
        return this.httpClient.get<JitrLcats[]>(`${this.baseURL}`);
    }

    getJitrLcatsByJitrNumber(jitrNumber: number): Observable<JitrLcats[]> {
        return this.httpClient.get<JitrLcats[]>(`${this.baseURL}/${jitrNumber}`);
    }

    getMaxJitrLcatID(): Observable<number> {
        return this.httpClient.get<number>(`${this.baseURL}` + '/max-id');
    }

    addJitrLcats(jitrLcats: JitrLcats): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, jitrLcats);
    }
}