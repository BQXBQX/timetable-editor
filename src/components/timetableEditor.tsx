import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useEventsList } from "../hooks/useEventsList";
import { type Event } from "../types/event";
import { ToolsBar } from "./toolsBar";

export const TimetableEditor = () => {
  const stageRef = useRef<Stage | null>(null);
  const layerRef = useRef<Layer | null>(null);
  const notoSansSf = useRef<FontFace | null>(null);
  const notoSansSfBold = useRef<FontFace | null>(null);
  const eventsListRef = useRef<Event[]>([]);
  const { eventsList, setEventsList } = useEventsList();
  eventsListRef.current = eventsList;

  useEffect(() => {
    stageRef.current = new Konva.Stage({
      container: "container",
      width: window.innerWidth / 2,
      height: window.innerHeight,
    });

    // 创建层
    layerRef.current = new Konva.Layer();

    stageRef.current.add(layerRef.current);

    notoSansSf.current = new FontFace(
      "noto-sans-sc",
      "url(./noto-sans-sc-chinese-simplified-400-normal.woff)",
    );

    notoSansSfBold.current = new FontFace(
      "noto-sans-sc-bold",
      "url(./noto-sans-sc-chinese-simplified-700-normal.woff)",
    );

    return () => {
      stageRef.current = null;
      layerRef.current = null;
      notoSansSf.current = null;
      notoSansSfBold.current = null;
    };
  }, []);

  const canvasWidth = useMemo(() => window.innerWidth / 2, []);

  const generateCanvas = useCallback(() => {
    const eventsList: Event[] = eventsListRef.current;

    const backImageObj = new Image();
    backImageObj.onload = function () {
      const back = new Konva.Rect({
        x: 0,
        y: 0,
        width: canvasWidth,
        height: window.innerHeight,
        fillPatternImage: backImageObj,
        fillPatternRepeat: "repeat",
        fillPatternScaleX: 0.05,
        fillPatternScaleY: 0.05,
      });

      layerRef.current?.add(back);

      back.zIndex(0);
    };
    backImageObj.src = "./Back.png";

    const headerImageObj = new Image();
    headerImageObj.onload = function () {
      const aspectRatio =
        headerImageObj.naturalHeight / headerImageObj.naturalWidth;
      const header = new Konva.Image({
        x: 0,
        y: 0,
        image: headerImageObj,
        width: canvasWidth,
        height: canvasWidth * aspectRatio,
      });

      layerRef.current?.add(header);

      header.zIndex(1);
    };
    headerImageObj.src = "./Header1.png";

    notoSansSf.current
      ?.load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);

        const title = new Konva.Text({
          x: canvasWidth * 0.05,
          y: canvasWidth * 0.16,
          fontSize: canvasWidth * 0.1,
          fontFamily: "noto-sans-sc",
          text: "软研",
          fill: "black",
        });

        layerRef.current?.add(title);

        title.zIndex(2);
      })
      .catch((error) => console.log(error));

    notoSansSfBold.current
      ?.load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);

        const title = new Konva.Text({
          x: canvasWidth * 0.05,
          y: canvasWidth * 0.28,
          fontSize: canvasWidth * 0.1,
          fontFamily: "noto-sans-sc-bold",
          lineHeight: canvasWidth * 0.0016,
          text: "第15周\n授课课表",
          fill: "black",
        });

        layerRef.current?.add(title);

        title.zIndex(2);
      })
      .catch((error) => console.log(error));

    layerRef.current?.batchDraw();

    console.log("generate");
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw" }}>
      <div id="container" />
      <div
        id="divider"
        style={{ height: "100vh", width: "1px", backgroundColor: "#c5c5c5" }}
      />
      <ToolsBar generateClick={generateCanvas}></ToolsBar>
    </div>
  );
};
