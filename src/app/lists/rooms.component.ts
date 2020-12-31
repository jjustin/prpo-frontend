import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Room } from "./models/room";

import { RoomsService } from "./services/rooms.service";

@Component({
  moduleId: module.id,
  selector: "owner's rooms",
  templateUrl: "rooms.component.html",
})
export class RoomsComponent implements OnInit {
  owner: string;
  rooms: Room[];
  room: Room;

  constructor(private roomsService: RoomsService, private router: Router) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomsService.getRooms().subscribe((rooms) => (this.rooms = rooms));
  }

  toDetails(room: Room): void {
    this.room = room;
    this.router.navigate(["/rooms", this.room.id]);
  }

  addRoom() {
    this.router.navigate(["/rooms/new"]);
  }

  delete(room: Room): void {
    this.roomsService
      .deleteRoom(room.id)
      .subscribe(
        (seznamId) => (this.rooms = this.rooms.filter((s) => s.id !== seznamId))
      );
  }
}
