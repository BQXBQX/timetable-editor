import { useEffect, useState } from "react";
import { Event } from "../types/event";
import { getEventsList } from "../utils/getEventsList";

export const useEventsList = () => {
  const [eventsList, setEventsList] = useState<Event[]>([]);

  useEffect(() => {
    getEventsList().then((result) => setEventsList(result));
  }, []);

  return { eventsList, setEventsList };
};
