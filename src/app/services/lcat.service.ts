import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lcat } from "../models/lcat.model";

@Injectable({
    providedIn: 'root'
})
export class LcatService {
    private baseURL = "http://localhost:8080/api/v1/lcats";

    constructor(private httpClient: HttpClient) { }

    getLcatList(): Observable<Lcat[]> {
        return this.httpClient.get<Lcat[]>(`${this.baseURL}`);
    }

    addLcat(lcat: Lcat): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, lcat);
    }
}