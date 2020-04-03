import { Component, OnInit } from '@angular/core';
import { IGuest, GuestService, IRoomStay, IRoomStayGet } from './guest.stay.service';
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
    adjustedRooms: IRoom[];
    roomStay: IRoomStay;
    date: Date;
    roomStayGet: IRoomStayGet[];
    roomStayGetLength: number;
    roomsLength: number;


    constructor(
        private router: Router,
        private guestService: GuestService,
        private roomService: RoomService,
        private toastr: ToastrService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {

        this.datePipe.transform(this.date, 'yyyy-MM-dd');

        this.guestService.getGuests().subscribe((guests) => {
            this.guests = guests;
        });

        this.roomService.get('').subscribe((rooms) => {
            this.rooms = rooms;
            this.adjustedRooms = rooms;
            this.roomsLength = rooms.length;
        });


    }

    bookStay(): void {
        this.roomStay = {
            Guest: this.selectedGuest,
            StayDateStart: this.date,
            Room: this.selectedRoom,
            StayLength: 1,
        };

        this.guestService.roomStay(this.roomStay).subscribe(() => {
            this.toastr.success('Room Booked');
        });
    }

    checkDate(): void {
        console.log('in check date()');
        this.guestService.getRoomStays(this.date).subscribe((roomStayGet) => {
            this.roomStayGet = roomStayGet;
            this.roomStayGetLength = roomStayGet.length;
            this.adjustedRooms = [];
            console.log(this.adjustedRooms);
            for (let i = 0; i < this.roomStayGetLength; i++) {
                const tempRoomID = this.roomStayGet[i].RoomID;
                for (let j = 0; j < this.roomsLength; j++) {
                    const tempRoom = this.rooms;
                    if (this.rooms[j].ID === tempRoomID) {
                        this.adjustedRooms.push(this.rooms[j]);
                        console.log(this.adjustedRooms);
                    }
                }
            }
        });

    }

    clickTest(): void {
        console.log('In click test');
    }


}
