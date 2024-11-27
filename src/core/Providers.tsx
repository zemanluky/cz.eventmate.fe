import * as React from "react";
import {ReactNode} from "react";
import { ToastProvider } from "src/providers/ToastProvider";

export const Providers: React.FC<{children?: ReactNode}> = ({children}) => {
    // put context providers here...

    return <>
        <ToastProvider />
        {children}
    </>;
}