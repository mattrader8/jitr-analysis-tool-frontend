import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JitrOrganization } from "../models/jitr-organization.model";

@Injectable({
    providedIn: 'root'
})
export class JitrOrganizationService {
    private baseURL = "http://localhost:8080/api/v1/jitr-organizations";

    constructor(private httpClient: HttpClient) { }

    getJitrOrganizationsList(): Observable<JitrOrganization[]> {
        return this.httpClient.get<JitrOrganization[]>(`${this.baseURL}`);
    }
}