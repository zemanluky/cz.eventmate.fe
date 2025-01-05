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
import RouteGuard from "./RouteGuard";
import { Calendar } from "src/pages/Calendar";

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
        /* 👈 Renders at /#/my-profile */
        element: (
          <RouteGuard>
            <MyProfilePage />
          </RouteGuard>
        ),
      },
      {
        path: "create-event",
        /* 👈 Renders at /#/create-event/ */
        element: (
          <RouteGuard>
            <CreateEventFormPage />
          </RouteGuard>
        ),
      },
      {
        path: "my-events",
        /* 👈 Renders at /#/my-events/ */
        element: (
          <RouteGuard>
            <MyEvents />
          </RouteGuard>
        ),
      },

      {
        path: "edit-event/:eventId",
        /* 👈 Renders at /#/edit-event/:eventId/ */
        element: (
          <RouteGuard>
            <EditEventFormPage />
          </RouteGuard>
        ),
      },
      {
        path: "event-detail/:eventId",
        element: <EventDetail /> /* 👈 Renders at /#/event-detail/:eventId/ */,
      },
      {
        path: "profile/:userId",
        element: <ProfilePage /> /* 👈 Renders at /#/profile/:userId */,
      },
      {
        path: "calendar",
        element: <Calendar /> /* 👈 Renders at /#/calendar */,
      },

      // add more routes here...
    ],
  },
  // add different page layout...
];
// hash router is necessary here because otherwise it would not work on GitHub pages
const router = createHashRouter(routes);

export const Router: React.FC = () => <RouterProvider router={router} />;
