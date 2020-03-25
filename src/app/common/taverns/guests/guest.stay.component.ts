import { Component, OnInit } from '@angular/core';
import { IGuest, GuestService, IRoomStay } from './guest.stay.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from '../rooms/room.service';
import { IRoom } from '../my.tavern.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-guest',
    templateUrl: './guest.stay.component.html'
}) export class GuestStayComponent implements OnInit {

    selectedGuest: any;
    selectedRoom: any;
    guests: IGuest[];
    rooms: IRoom[];
    roomStay: IRoomStay;
    date: string;

    constructor(
        private router: Router,
        private guestService: GuestService,
        private roomService: RoomService,
        private toastr: ToastrService,
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
        const tempBookDate = new Date();
        const datePipe = new DatePipe('en-US');
        const bookDate = datePipe.transform(tempBookDate, 'yyyy-MM-dd');
        this.roomStay = {
            Guest: this.selectedGuest,
            StayDateStart: this.date,
            Room: this.selectedRoom,
            StayLength: 1,
            BookingDate: bookDate
        };
    
        
        console.log(this.roomStay.StayDateStart);
        console.log(this.roomStay.BookingDate);

        this.guestService.roomStay(this.roomStay).subscribe();
    }


}
