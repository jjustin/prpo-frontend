import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { RoomsService } from "./lists/services/rooms.service";
import { RoomsComponent } from "./lists/rooms.component";
import { RoomDetailsComponent } from "./lists/room-details.component";
import { EntrancesService } from "./lists/services/entrances.service";
import { RoomAddComponent } from "./lists/room-add.component";
import { EntranceAddComponent } from "./lists/entrance-add.component";
import { EntranceNumberChangeComponent } from "./lists/entrance-number-change.component";

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomDetailsComponent,
    RoomAddComponent,
    EntranceAddComponent,
    EntranceNumberChangeComponent,
  ],
  providers: [RoomsService, EntrancesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
