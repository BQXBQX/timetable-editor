import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import { Event } from "../types/event";
import { makeEditable } from "../utils/makeEditable";

export function useGenerateEventItem(
  events: Event[],
  StageRef: RefObject<Stage>,
  titleFontRef: RefObject<FontFace>,
  canvasWidth: number,
  setHeight: Dispatch<SetStateAction<Number>>,
  isHeaderLoad: boolean,
  layref: RefObject<Layer>,
): RefObject<Group> {
  const eventsGroupRef = useRef<Group | null>(null);

  useEffect(() => {
    eventsGroupRef.current = new Konva.Group();

    isHeaderLoad &&
      titleFontRef.current?.load().then((loadedFont) => {
        document.fonts.add(loadedFont);

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

          eventsGroupRef.current?.add(title);
          makeEditable(title, StageRef);
          setHeight(StageRef.current!.height() + title.height());
          StageRef.current?.height(StageRef.current.height() + title.height());
        });

        layref.current?.add(eventsGroupRef.current!);
        layref.current?.batchDraw();
      });
  }, [isHeaderLoad]);

  return eventsGroupRef;
}
