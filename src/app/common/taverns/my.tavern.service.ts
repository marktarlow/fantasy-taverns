import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ITavern {
    ID: number;
    TavernName: string;
}

export interface IRoom {

    ID: number;
    RoomName: string;
    RoomStatus: boolean;
    TavernID: number;
    DailyRate: number;
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

getUserTavern(): Observable<ITavern> {
    return this.http
    .get<ITavern>('http://localhost:3000/currUserTavern');
}


}
