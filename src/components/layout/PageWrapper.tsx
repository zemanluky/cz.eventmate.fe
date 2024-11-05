import * as React from "react";
import {Outlet} from "react-router-dom";

/* Renders components present on any page and the contents of current route. */
export const PageWrapper: React.FC = () => {
    return (<>
        <h1>Navbar</h1> {/* Add real navbar here */}
        <Outlet/>
    </>);
}