import { EditEventForm } from "@Components/ui";
import * as React from "react";

interface EditEventFormPage {
  eventId: String;
}

export const EditEventFormPage: React.FC<EditEventFormPage> = ({ eventId }) => {
  return (
    <>
      <EditEventForm eventToEditId={eventId} />
    </>
  );
};
