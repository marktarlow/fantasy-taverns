import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRoom {

    ID: number;
    RoomName: string;
    RoomStatus: boolean;
    TavernID: number;
    DailyRate: number;
}

@Injectable({
    providedIn: 'root'
}) export class RoomService {
    constructor(private http: HttpClient) {}

    getTavernRoom(): Observable<IRoom[]> {
        return this.http.
        get<IRoom[]>('http://localhost:3000/tavernRooms');
    }
}
