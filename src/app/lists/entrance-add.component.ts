import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { EntrancesService } from "./services/entrances.service";

@Component({
  moduleId: module.id,
  selector: "entrance-add",
  templateUrl: "entrance-add.component.html",
})
export class EntranceAddComponent {
  roomId: number;
  name: string = "";

  constructor(
    private entrancesService: EntrancesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomId = parseInt(this.route.snapshot.paramMap.get("id"));
  }

  submitForm(): void {
    this.entrancesService
      .createEntrance(this.roomId, this.name)
      .subscribe(() => this.router.navigate(["/rooms/" + this.roomId]));
  }

  back(): void {
    this.router.navigate(["/rooms"]);
  }
}
