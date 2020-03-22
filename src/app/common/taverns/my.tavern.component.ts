import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyTavernService, ITavern } from './my.tavern.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { IRoom, RoomService } from './rooms/room.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    templateUrl: './my.tavern.component.html'
}) export class MyTavernComponent implements OnInit, OnDestroy {

    

    currUserTavern: ITavern;
    tavernRooms: IRoom[];
    searchText = '';

    searchUpdated = new Subject<string>();
    subscription = new Subscription();

    constructor(private myTavernService: MyTavernService, private roomService: RoomService) {
        this.subscription = this.searchUpdated
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((searchValue) => {
                this.searchRooms(searchValue);
            });
    }

    ngOnInit(): void {
       this.myTavernService.getUserTavern().subscribe((currUserTavern) => {
        this.currUserTavern = currUserTavern;
        });

        this.roomService.get('').subscribe((tavernRooms) => {
            this.tavernRooms = tavernRooms;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    search($event): void {
        this.searchUpdated.next($event.target.value);
    }

    searchRooms(searchValue: string): void {
        this.roomService.get(searchValue).subscribe((tavernRooms) => {
            this.tavernRooms = tavernRooms;
        });
    }


}
