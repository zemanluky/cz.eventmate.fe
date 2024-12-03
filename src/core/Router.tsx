import * as React from "react";
import {
  createHashRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { PageWrapper } from "@Components/layout";
import { Homepage, ProfilePage } from "@Pages";
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
        path: "profile",
        element: <ProfilePage /> /* 👈 Renders at /#/profile/ */,
      },
      {
        path: "createEvent",
        element: <CreateEventFormPage /> /* 👈 Renders at /#/createEvent/ */,
      },
      {
        path: "myEvents",
        element: <MyEvents /> /* 👈 Renders at /#/myEvents/ */,
      },

      {
        path: "editEvent/:eventId",
        element: (
          <EditEventFormPage />
        ) /* 👈 Renders at /#/editEvent/:eventId/ */,
      },

      // add more routes here...
    ],
  },
  // add different page layout...
];
// hash router is necessary here because otherwise it would not work on GitHub pages
const router = createHashRouter(routes);

export const Router: React.FC = () => <RouterProvider router={router} />;
