import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Stage } from "konva/lib/Stage";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import { Event } from "../types/event";
import { makeEditable } from "../utils/makeEditable";

export function generateEvents(
  events: Event[],
  StageRef: RefObject<Stage>,
  titleFontRef: RefObject<FontFace>,
  canvasWidth: number,
  setHeight: Dispatch<SetStateAction<Number>>,
): Group {
  const eventsGroup = new Konva.Group();

  titleFontRef.current?.load().then((loadedFont) => {
    document.fonts.add(loadedFont);

    console.log("render events");
    events.forEach((event) => {
      const thisHeight = StageRef.current?.height()!;

      const title = new Konva.Text({
        x: canvasWidth * 0.05,
        y: thisHeight,
        fontSize: canvasWidth * 0.06,
        fontFamily: "noto-sans-sc-bold",
        text: event.title,
        fill: "black",
      });

      eventsGroup.add(title);
      makeEditable(title, StageRef);
      setHeight(StageRef.current!.height() + title.height());
      StageRef.current?.height(StageRef.current.height() + title.height());
    });
  });

  return eventsGroup;
}
