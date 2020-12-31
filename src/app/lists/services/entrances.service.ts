import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

import { catchError } from "rxjs/operators";
import { Room } from "../models/room";
import { Entrance } from "../models/entrance";

@Injectable()
export class EntrancesService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  private url = "http://localhost:8080/v1/entrances";

  constructor(private http: HttpClient) {}

  getEntrances(roomId: number): Observable<Room[]> {
    const url = `${this.url}?filter=room.id:EQ:${roomId}`;
    return this.http.get<Room[]>(url).pipe(catchError(this.handleError));
  }

  deleteEntrance(id: number): Observable<number> {
    const url = `${this.url}/${id}`;
    return this.http.delete<number>(url).pipe(catchError(this.handleError));
  }

  createEntrance(roomId: number, name: string): Observable<Entrance> {
    return this.http
      .post<Entrance>(
        this.url,
        JSON.stringify({ room: { id: roomId }, name }),
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.handleError));
  }

  changeNumber(entranceId: number, number: number): Observable<any> {
    const url = `${this.url}/${entranceId}/change`;
    return this.http
      .post<any>(url, JSON.stringify({ number }), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  changeNumberFromImage(
    entranceId: number,
    imageUrl: string,
    peopleEnter: boolean
  ): Observable<any> {
    const url = `${this.url}/${entranceId}/changeFromImage`;
    return this.http
      .post<any>(url, JSON.stringify({ url: imageUrl, peopleEnter }), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred:", error);
    return Promise.reject(error.message || error);
  }
}
