import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGenerateEventItem } from "../hooks/generateEventItem";
import { useEventsList } from "../hooks/useEventsList";
import { type Event } from "../types/event";
import { makeEditable } from "../utils/makeEditable";
import { ToolsBar } from "./toolsBar";

export const TimetableEditor = () => {
  const stageRef = useRef<Stage | null>(null);
  const layerRef = useRef<Layer | null>(null);
  const notoSansSfBold = useRef<FontFace | null>(null);
  const eventsListRef = useRef<Event[]>([]);
  const { eventsList, setEventsList } = useEventsList();
  const [height, setHeight] = useState<Number>(0);
  const totalGroupRef = useRef<Group | null>(null);
  const [isHeaderLoad, setIsHeaderLoad] = useState<boolean>(false);
  eventsListRef.current = eventsList;

  useEffect(() => {
    stageRef.current = new Konva.Stage({
      container: "container",
      width: window.innerWidth / 2,
      height: 0,
    });

    // 创建层
    layerRef.current = new Konva.Layer();

    stageRef.current.add(layerRef.current);

    notoSansSfBold.current = new FontFace(
      "noto-sans-sc-bold",
      "url(./noto-sans-sc-chinese-simplified-700-normal.woff)",
    );

    return () => {
      stageRef.current = null;
      layerRef.current = null;
      notoSansSfBold.current = null;
    };
  }, []);

  useEffect(() => {
    // 当 height 发生变化时,自动重新渲染 background
    const backImageObj = new Image();
    backImageObj.onload = function() {
      const back = new Konva.Rect({
        x: 0,
        y: 0,
        width: canvasWidth,
        height: stageRef.current?.height(),
        fillPatternImage: backImageObj,
        fillPatternRepeat: "repeat",
        fillPatternScaleX: 0.05,
        fillPatternScaleY: 0.05,
      });

      totalGroupRef.current && totalGroupRef.current.add(back);
      back.zIndex(0);
    };
    backImageObj.src = "./Back.png";

    layerRef.current?.batchDraw();
  }, [height]);

  const canvasWidth = useMemo(() => window.innerWidth / 2, []);

  const generateCanvas = useCallback(() => {
    // every generate will clear last generate

    layerRef.current?.destroyChildren();
    stageRef.current?.height(0);
    setIsHeaderLoad(false);

    const eventsList: Event[] = eventsListRef.current;

    totalGroupRef.current = new Konva.Group();
    const headerGroup = new Konva.Group();
    const headerTitleGroup = new Konva.Group();

    const headerImageObj = new Image();
    headerImageObj.onload = function() {
      const aspectRatio =
        headerImageObj.naturalHeight / headerImageObj.naturalWidth;
      const header = new Konva.Image({
        x: 0,
        y: 0,
        image: headerImageObj,
        width: canvasWidth,
        height: canvasWidth * aspectRatio,
      });

      headerGroup.add(header);
      setHeight(stageRef.current!.height() + header.height());
      setIsHeaderLoad(true);
      stageRef.current?.height(stageRef.current.height() + header.height());
      header.zIndex(0);
    };
    headerImageObj.src = "./Header1.png";

    const departmentTitle = new Konva.Text({
      x: canvasWidth * 0.05,
      y: canvasWidth * 0.16,
      fontSize: canvasWidth * 0.1,
      fontFamily: "noto-sans-sc",
      text: "软研",
      fill: "black",
    });

    headerTitleGroup.add(departmentTitle);
    makeEditable(departmentTitle, stageRef);

    notoSansSfBold.current
      ?.load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);

        const classTitle = new Konva.Text({
          x: canvasWidth * 0.05,
          y: canvasWidth * 0.28,
          fontSize: canvasWidth * 0.1,
          fontFamily: "noto-sans-sc-bold",
          lineHeight: 1.1,
          text: "第xx周\n授课课表",
          fill: "black",
        });

        headerTitleGroup.add(classTitle);
        makeEditable(classTitle, stageRef);
      })
      .catch((error) => console.log(error));

    headerGroup.add(headerTitleGroup);
    totalGroupRef.current.add(headerGroup);
    layerRef.current?.add(totalGroupRef.current);
    layerRef.current?.batchDraw();
  }, []);

  const eventsGroupRef = useGenerateEventItem(
    eventsListRef.current,
    stageRef,
    notoSansSfBold,
    canvasWidth,
    setHeight,
    isHeaderLoad,
    layerRef,
  );

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
