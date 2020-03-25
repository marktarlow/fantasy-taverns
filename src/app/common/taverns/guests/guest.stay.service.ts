import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoom } from '../my.tavern.service';

export interface IGuest {
    ID: string;
    GuestName: string;
    GuestStatus: string;
    Birthday: Date;
    Cakeday: Date;
    VIP: boolean;
}

export interface IRoomStay {
    Guest: IGuest;
    StayDateStart: string;
    Room: IRoom;
    StayLength: number;
    BookingDate: string;
}

@Injectable({
    providedIn: 'root'
}) export class GuestService {
    constructor(private http: HttpClient) {}


    getGuests(): Observable<IGuest[]> {
        return this.http.
        get<IGuest[]>('http://localhost:3000/getGuests');
    }

    roomStay(data: IRoomStay): Observable<any> {
        return this.http.
        put<any>('http://localhost:3000/roomStay', data);
    }
}
