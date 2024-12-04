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
        element: (
        <RouteGuard>
          <MyProfilePage /> /* 👈 Renders at /#/my-profile */,
        </RouteGuard>
        )
      },
      {
        path: "create-event",
        element: (
          <RouteGuard>
            <CreateEventFormPage /> /* 👈 Renders at /#/create-event/ */,
          </RouteGuard>
          )
      },
      {
        path: "my-events",
        element: (
          <RouteGuard>
            <MyEvents /> /* 👈 Renders at /#/my-events/ */,
          </RouteGuard>
          )
      },

      {
        path: "edit-event/:eventId",
        element: (
          <RouteGuard>
            <EditEventFormPage /> /* 👈 Renders at /#/edit-event/:eventId/ */,
          </RouteGuard>
        ) 
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
