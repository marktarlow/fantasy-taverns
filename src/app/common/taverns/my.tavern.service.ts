import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ITavern {
    ID: number;
    TavernName: string;
}

@Injectable({
    providedIn: 'root',
})
export class MyTavernService {
constructor(private http: HttpClient) {}

getTaverns(): Observable<ITavern[]> {
    return this.http
    .get<ITavern[]>('http://localhost:3000/taverns');
}

}
