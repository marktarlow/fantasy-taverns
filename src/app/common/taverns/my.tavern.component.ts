import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyTavernService, ITavern } from './my.tavern.service';
import { Subject, Subscription } from 'rxjs';
import { IRoom, RoomService } from './rooms/room.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tavern',
    templateUrl: './my.tavern.component.html',
}) export class MyTavernComponent implements OnInit, OnDestroy {

    

    currUserTavern: ITavern;
    tavernRooms: IRoom[];
    searchText = '';
    isOwner = false;
    private currUser = JSON.parse(String(this.authService.currentUser.getValue().user));

    searchUpdated = new Subject<string>();
    subscription = new Subscription();

    constructor(
        private myTavernService: MyTavernService,
        private roomService: RoomService,
        private authService: AuthService, 
        private router: Router) {
        this.subscription = this.searchUpdated
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(() => {
                this.searchRooms();
            });
    }

    ngOnInit(): void {
       this.myTavernService.getUserTavern().subscribe((currUserTavern) => {
        this.currUserTavern = currUserTavern;
        });

        this.roomService.get('').subscribe((tavernRooms) => {
            this.tavernRooms = tavernRooms;
        });

        if (this.currUser.RoleID === 1) {
            this.isOwner = true;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    search($event): void {
        this.searchUpdated.next($event.target.value);
    }

    searchRooms(): void {
        this.roomService.get(this.searchText).subscribe((tavernRooms) => {
            this.tavernRooms = tavernRooms;
        });
    }

    deleteRoom(room: IRoom, event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        this.roomService.deleteRoom(room).subscribe();
        this.searchRooms();
    }

    bookRoom(event: MouseEvent): void {
        this.router.navigate(['my-tavern/book-room']);
    }


}
