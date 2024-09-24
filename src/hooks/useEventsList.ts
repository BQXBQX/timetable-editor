import { useEffect, useState } from "react";
import { Event } from "../types/event";
import { getEventsList } from "../utils/getEventsList";

export const useEventsList = () => {
  const [eventsList, setEventsList] = useState<Event[]>([]);

  useEffect(() => {
    getEventsList().then((result) => {
      const sortedEvents = result.sort((a: any, b: any) => {
        return (
          new Date(a.gmtEventStart).getTime() -
          new Date(b.gmtEventStart).getTime()
        );
      });
      setEventsList(sortedEvents);
    });
  }, []);

  return { eventsList, setEventsList };
};
