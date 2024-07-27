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
          .join("&");

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
        text: `⌚ 时间: 7.24 14:30 ~ 16:00 \n🏫 地点: 青柚创新汇\n📚 主题: HTML,JS,CSS 入门`,
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

    // 最后加长一点好看
    setHeight(StageRef.current?.height()! + 0.08 * canvasWidth);
    StageRef.current?.height(StageRef.current.height() + 0.08 * canvasWidth);
  });

  return eventsGroup;
}
