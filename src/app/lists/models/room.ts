import { Entrance } from "./entrance";

export class Room {
  id: number;
  inRoom: number;
  name: string;
  owner: string;
  size: number;
  entranceList: Entrance[];
}
