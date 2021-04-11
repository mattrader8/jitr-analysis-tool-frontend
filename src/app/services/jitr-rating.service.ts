import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JitrRating } from "../models/jitr-rating.model";

@Injectable({
    providedIn: 'root'
})
export class JitrRatingService {
    private baseURL = "http://localhost:8080/api/v1/jitr-ratings";

    constructor(private httpClient: HttpClient) { }

    getJitrRatingsList(): Observable<JitrRating[]> {
        return this.httpClient.get<JitrRating[]>(`${this.baseURL}`);
    }

    addJitrRating(jitrRating: JitrRating): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, jitrRating);
    }
}