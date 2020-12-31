import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RoomsComponent } from "./lists/rooms.component";
import { RoomDetailsComponent } from "./lists/room-details.component";
import { RoomAddComponent } from "./lists/room-add.component";
import { EntranceAddComponent } from "./lists/entrance-add.component";
import { EntranceNumberChangeComponent } from "./lists/entrance-number-change.component";

const routes: Routes = [
  { path: "", redirectTo: "/rooms", pathMatch: "full" },
  { path: "rooms", component: RoomsComponent },
  { path: "rooms/new", component: RoomAddComponent },
  { path: "rooms/:id", component: RoomDetailsComponent },
  { path: "rooms/:id/new", component: EntranceAddComponent },
  { path: "rooms/:id/:eid/:type", component: EntranceNumberChangeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
