import { Component, OnInit } from '@angular/core';
import { IGuest, GuestService } from './guest.stay.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from '../rooms/room.service';
import { IRoom } from '../my.tavern.service';

@Component({
    selector: 'app-guest',
    templateUrl: './guest.stay.component.html'
}) export class GuestStayComponent implements OnInit {

    selectedGuest: any;
    selectedRoom: any;
    guests: IGuest[];
    rooms: IRoom[];
    date: Date;

    constructor(
        private router: Router,
        private guestService: GuestService,
        private roomService: RoomService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.guestService.getGuests().subscribe((guests) => {
            this.guests = guests;
        });

        this.roomService.get('').subscribe((rooms) =>{
            this.rooms = rooms;
        });

    }

    bookStay(): void {
        
    }


}
