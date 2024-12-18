import * as React from "react";
import {ReactNode} from "react";
import { ToastProvider } from "src/providers/ToastProvider";
import { FilterProvider } from "../contexts/FilterContext";

export const Providers: React.FC<{children?: ReactNode}> = ({children}) => {
    // put context providers here...

    return <>
        <FilterProvider>
            <ToastProvider />
            {children}
        </FilterProvider>
    </>;
}