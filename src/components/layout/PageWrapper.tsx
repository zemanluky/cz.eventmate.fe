import { Navbar } from "@Components/ui";
import * as React from "react";
import {Outlet, useLocation} from "react-router-dom";
import { PageLayout } from "./PageLayout";

/* Renders components present on any page and the contents of current route. */
export const PageWrapper: React.FC = () => {
    const { pathname } = useLocation();
    const canRenderNavbar = pathname !== "/auth"
    return (<>
        {/* Navbar */}
        {canRenderNavbar ? <Navbar/> : null}
        {/* Page layout for every page */}
        <PageLayout>
            <Outlet/>
        </PageLayout>
    </>);
}