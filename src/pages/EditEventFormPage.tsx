//import { EditEventForm } from "@Components/ui";
import { Text } from "@ParkComponents/text";
import * as React from "react";
import { useParams } from "react-router-dom";

export const EditEventFormPage: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId as string;
  return (
    <>
      <Text>{eventId}</Text>
      {/*<EditEventForm eventToEditId={eventId} />*/}
    </>
  );
};
