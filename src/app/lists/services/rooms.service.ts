import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

import { catchError } from "rxjs/operators";
import { Room } from "../models/room";
import { NewRoom } from "../models/newRoom";

@Injectable()
export class RoomsService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  private url = "http://localhost:8080/v1/rooms";

  constructor(private http: HttpClient) {}

  getOwners(): Observable<String[]> {
    const url = `${this.url}/owners`;
    return this.http.get<String[]>(this.url).pipe(catchError(this.handleError));
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url).pipe(catchError(this.handleError));
  }

  getRoom(id: number): Observable<Room> {
    const url = `${this.url}/${id}`;
    return this.http.get<Room>(url).pipe(catchError(this.handleError));
  }

  deleteRoom(id: number): Observable<number> {
    const url = `${this.url}/${id}`;
    return this.http.delete<number>(url).pipe(catchError(this.handleError));
  }

  createRoom(newRoom: NewRoom): Observable<Room> {
    return this.http
      .post<Room>(this.url, JSON.stringify(newRoom), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred:", error);
    return Promise.reject(error.message || error);
  }
}
