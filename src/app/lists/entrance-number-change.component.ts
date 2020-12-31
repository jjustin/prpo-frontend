import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Room } from "./models/room";

import { EntrancesService } from "./services/entrances.service";
import { RoomsService } from "./services/rooms.service";

@Component({
  moduleId: module.id,
  selector: "entrance-number-change",
  templateUrl: "entrance-number-change.component.html",
})
export class EntranceNumberChangeComponent {
  room: Room;
  entranceId: number;
  type: number; // -1 == leave, 1 == enter
  num: number = 1;
  max: number = 0;
  url: string = "";

  constructor(
    private entrancesService: EntrancesService,
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.roomsService.getRoom(+params["id"]))
      )
      .subscribe((room) => {
        this.room = room;

        this.entranceId = parseInt(this.route.snapshot.paramMap.get("eid"));

        switch (this.route.snapshot.paramMap.get("type")) {
          case "leave":
            this.type = -1;
            this.max = this.room.inRoom;
            break;
          case "enter":
            this.type = 1;
            this.max = this.room.size - this.room.inRoom;
            break;
          default:
            this.type = 0;
        }
      });
  }

  submitForm(): void {
    this.entrancesService
      .changeNumber(this.entranceId, this.type * this.num)
      .subscribe(() => this.router.navigate(["/rooms/" + this.room.id]));
  }

  submitFormFromImage(): void {
    this.entrancesService
      .changeNumberFromImage(this.entranceId, this.url, this.type === 1)
      .subscribe(() => this.router.navigate(["/rooms/" + this.room.id]));
  }

  back(): void {
    this.router.navigate(["/rooms", this.room.id]);
  }
}
