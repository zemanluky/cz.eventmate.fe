//import { EditEventForm } from "@Components/ui";
import { EditEventForm } from "@Components/ui";
import * as React from "react";
import { useParams } from "react-router-dom";

export const EditEventFormPage: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId as string;
  return (
    <>
      <EditEventForm eventToEditId={eventId} />
    </>
  );
};
