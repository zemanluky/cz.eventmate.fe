import * as React from "react";
import {createHashRouter, RouteObject, RouterProvider} from "react-router-dom";
import {PageWrapper} from "@Components/layout";
import {Homepage} from "@Pages";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <PageWrapper/>,
        children: [
            {
                path: '',
                element: <Homepage/>
            },
            // add more routes here...
        ]
    },
    // add different page layout...
];
// hash router is necessary here because otherwise it would not work on GitHub pages
const router = createHashRouter(routes);

export const Router: React.FC = () => <RouterProvider router={router} />