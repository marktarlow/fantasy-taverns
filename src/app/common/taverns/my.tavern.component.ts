import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyTavernService, ITavern } from './my.tavern.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { IRoom, RoomService } from './rooms/room.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './my.tavern.component.html'
}) export class MyTavernComponent implements OnInit {

    

    todos: IRoom[];
    searchText = '';

    searchUpdated = new Subject<string>();
    subscription = new Subscription();

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
