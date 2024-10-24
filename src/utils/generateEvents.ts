import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Stage } from "konva/lib/Stage";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Event } from "../types/event";
import { makeEditable } from "../utils/makeEditable";
import { transformTime } from "./transformTime";

export function generateEvents(
  events: Event[],
  StageRef: RefObject<Stage>,
  titleFontRef: RefObject<FontFace>,
  canvasWidth: number,
  setHeight: Dispatch<SetStateAction<Number>>
): Group {
  const eventsGroup = new Konva.Group();

  titleFontRef.current?.load().then((loadedFont) => {
    // @ts-ignore
    document.fonts.add(loadedFont);

    const eventsGap = canvasWidth * 0.06;
    const titlePaddingTop = canvasWidth * 0.02;
    const titlePaddingLeft = canvasWidth * 0.02;
    const contentMargin = canvasWidth * 0.035;
    events.forEach((event) => {
      const thisHeight = StageRef.current?.height()!;

      const departments: string =
        ">  " +
        event.departments
          .map((department) => department.departmentName)
          .join("/");

      const title = new Konva.Text({
        x: canvasWidth * 0.05 + titlePaddingLeft,
        y: thisHeight + titlePaddingTop + eventsGap,
        fontSize: canvasWidth * 0.05,
        fontFamily: "noto-sans-sc-bold",
        text: departments,
        fill: "black",
      });

      const titleBack = new Konva.Rect({
        x: canvasWidth * 0.05,
        y: thisHeight + eventsGap,
        width: title.width() + 2 * titlePaddingLeft,
        height: title.height() + titlePaddingTop * 2,
        fill: "#C3FD47",
      });

      const time = transformTime(event.gmtEventStart, event.gmtEventEnd);
      console.log("活动时间", time);

      console.log(event);
      const contentText = new Konva.Text({
        x: canvasWidth * 0.05,
        y:
          thisHeight +
          eventsGap +
          title.height() +
          2 * titlePaddingTop +
          contentMargin,
        fontSize: canvasWidth * 0.045,
        lineHeight: 1.25,
        fontFamily: "noto-sans-sc",
        text: `主题: ${event.description.split("\n")[0] || event.title}\n时间:${time} \n地点: ${event.location
          .split(" ")
          .slice(-2)
          .join(" ")}`,
        fill: "black",
      });

      eventsGroup.add(titleBack, title, contentText);
      makeEditable(title, StageRef);
      makeEditable(contentText, StageRef);
      const newHeight =
        StageRef.current!.height() +
        title.height() +
        eventsGap +
        2 * titlePaddingTop +
        contentText.height() +
        contentMargin;
      setHeight(newHeight);
      StageRef.current?.height(newHeight);
    });

    // 在生成的 Canvas 最后加长一截
    setHeight(StageRef.current?.height()! + 0.08 * canvasWidth);
    StageRef.current?.height(StageRef.current.height() + 0.08 * canvasWidth);
  });

  return eventsGroup;
}
