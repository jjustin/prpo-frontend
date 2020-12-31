import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { switchMap } from "rxjs/operators";
import { Room } from "./models/room";
import { EntrancesService } from "./services/entrances.service";
import { RoomsService } from "./services/rooms.service";

@Component({
  moduleId: module.id,
  selector: "room-details",
  templateUrl: "room-details.component.html",
})
export class RoomDetailsComponent implements OnInit {
  room: Room;
  constructor(
    private roomsService: RoomsService,
    private entrancesService: EntrancesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.roomsService.getRoom(+params["id"]))
      )
      .subscribe((room) => {
        this.entrancesService
          .getEntrances(room.id)
          .subscribe((entrances) => (room.entranceList = entrances));
        this.room = room;
      });
  }

  addEntrance(): void {
    this.router.navigate(["rooms/" + this.room.id + "/new"]);
  }

  peopleEnter(eid: number): void {
    this.router.navigate(["rooms/" + this.room.id + "/" + eid + "/enter"]);
  }
  peopleLeave(eid: number): void {
    this.router.navigate(["rooms/" + this.room.id + "/" + eid + "/leave"]);
  }
  deleteEntrance(eid: number): void {
    this.entrancesService
      .deleteEntrance(eid)
      .subscribe(
        (entranceId) =>
          (this.room.entranceList = this.room.entranceList.filter(
            (s) => s.id !== entranceId
          ))
      );
  }

  back(): void {
    this.router.navigate(["rooms"]);
  }
}
