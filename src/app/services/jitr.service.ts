import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Jitr } from "../models/jitr.model";

@Injectable({
    providedIn: 'root'
})
export class JitrService {
    private baseURL = "http://localhost:8080/api/v1/jitrs";

    constructor(private httpClient: HttpClient) { }

    getJitrsList(): Observable<Jitr[]> {
        return this.httpClient.get<Jitr[]>(`${this.baseURL}`);
    }

    addJitr(jitr: Jitr): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, jitr);
    }

    getJitrByNumber(jitrNumber: number): Observable<Jitr> {
        return this.httpClient.get<Jitr>(`${this.baseURL}/${jitrNumber}`);
    }

    getDeclinedJitrs(): Observable<Jitr[]> {
        return this.httpClient.get<Jitr[]>(`${this.baseURL}` + '/declined-jitrs');
    }

    getAverageCostDifference(): Observable<number> {
        return this.httpClient.get<number>(`${this.baseURL}` + '/average-cost-difference');
    }

    updateJitr(jitrNumber: number, jitr: Jitr): Observable<Object> {
        return this.httpClient.put(`${this.baseURL}/${jitrNumber}`, jitr);
    }

    deleteJitr(jitrNumber: number): Observable<Object> {
        return this.httpClient.delete(`${this.baseURL}/${jitrNumber}`);
    }
}