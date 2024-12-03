import * as React from "react";
import {
  createHashRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { PageWrapper } from "@Components/layout";
import { EventDetail, Homepage, MyProfilePage, ProfilePage } from "@Pages";
import { AuthPage } from "@Pages";
import { CreateEventFormPage } from "src/pages/CreateEventFormPage";
import { MyEvents } from "src/pages/MyEvents";
import { EditEventFormPage } from "src/pages/EditEventFormPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PageWrapper />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "auth",
        element: <AuthPage /> /* 👈 Renders at /#/auth/ */,
      },
      {
        path: "my-profile",
        element: <MyProfilePage /> /* 👈 Renders at /#/my-profile */,
      },
      {
        path: "create-event",
        element: <CreateEventFormPage /> /* 👈 Renders at /#/createEvent/ */,
      },
      {
        path: "my-events",
        element: <MyEvents /> /* 👈 Renders at /#/myEvents/ */,
      },

      {
        path: "edit-event/:eventId",
        element: (
          <EditEventFormPage />
        ) /* 👈 Renders at /#/edit-event/:eventId/ */,
      },
      {
        path: "event-detail/:eventId",
        element: <EventDetail /> /* 👈 Renders at /#/event-detail/:eventId/ */,
      },
      {
        path: "profile/:userId",
        element: <ProfilePage /> /* 👈 Renders at /#/profile/:userId */,
      },

      // add more routes here...
    ],
  },
  // add different page layout...
];
// hash router is necessary here because otherwise it would not work on GitHub pages
const router = createHashRouter(routes);

export const Router: React.FC = () => <RouterProvider router={router} />;
