import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NewRoom } from "./models/newRoom";
import { RoomsService } from "./services/rooms.service";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "room-add",
  templateUrl: "room-add.component.html",
})
export class RoomAddComponent {
  room: NewRoom;
  entrances: string;

  constructor(private roomService: RoomsService, private router: Router) {
    this.room = new NewRoom();
    this.room.size = 10;
    this.room.inRoom = 0;
    this.entrances = "";
  }

  submitForm(): void {
    var entrances = this.entrances.split(",");
    entrances.map((x) => x.trim());
    this.room.entrancesNames = entrances;

    this.roomService
      .createRoom(this.room)
      .subscribe((room) => this.router.navigate(["/rooms/" + room.id]));
  }

  back(): void {
    this.router.navigate(["/rooms"]);
  }
}
