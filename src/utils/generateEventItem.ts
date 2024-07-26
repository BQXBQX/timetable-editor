import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Event } from "../types/event";

export function generateEventItem(event: Event): Group {
  const eventGroup = new Konva.Group();
  return eventGroup;
}
