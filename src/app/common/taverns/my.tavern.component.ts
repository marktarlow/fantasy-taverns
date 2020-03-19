import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyTavernService, ITavern } from './my.tavern.service';
import { Observable } from 'rxjs';
import { IRoom, RoomService } from './rooms/room.service';

@Component({
    templateUrl: './my.tavern.component.html'
}) export class MyTavernComponent implements OnInit {


    constructor(private myTavernService: MyTavernService, private roomService: RoomService) {}

    currUserTavern: ITavern;
    tavernRooms: IRoom[];
    
    ngOnInit(): void {
       this.myTavernService.getUserTavern().subscribe((currUserTavern) => {
        this.currUserTavern = currUserTavern;
        });

        this.roomService.getTavernRoom().subscribe((tavernRooms) => {
            this.tavernRooms = tavernRooms;
        });
    }


}
