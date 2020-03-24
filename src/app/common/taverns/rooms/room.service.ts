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

    getById(id: number): Observable<IRoom> {
        return this.http.get<IRoom>(`http://localhost:3000/tavernRooms/${id}`);
    }

    get(searchText: string): Observable<IRoom[]> {
        return this.http.get<IRoom[]>(
            `http://localhost:3000/tavernRooms?Search=${searchText}`,
        );
    }

    saveRoom(room: IRoom): Observable<IRoom> {
        const isEdit = room.ID > 0;
        if (isEdit) {
            return this.http.put<IRoom>(
                `http://localhost:3000/tavernRooms/${room.ID}`, room
            );
        } else {
            return this.http.post<IRoom>(
                'http://localhost:3000/tavernRooms', room
            );
        }
    }

    deleteRoom(room: IRoom): Observable<any> {
        return this.http.delete<any>(
            `http://localhost:3000/tavernRooms/${room.ID}`
        )
    }

}
