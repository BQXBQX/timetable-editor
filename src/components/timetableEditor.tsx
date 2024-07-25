import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import React, { useCallback, useEffect, useRef } from "react";
import { useEventsList } from "../hooks/useEventsList";
import { type Event } from "../types/event";

export const TimetableEditor = () => {
  const stageRef = useRef<Stage | null>(null);
  const eventsListRef = useRef<Event[]>([]);
  const { eventsList, setEventsList } = useEventsList();
  eventsListRef.current = eventsList;

  useEffect(() => {
    stageRef.current = new Konva.Stage({
      container: "container",
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // 创建层
    const layer = new Konva.Layer();

    stageRef.current.add(layer);

    return () => {
      stageRef.current = null;
    };
  }, []);

  const generateCanvas = useCallback(() => {
    const eventsList: Event[] = eventsListRef.current;
  }, []);

  return <div id="container" />;
};
