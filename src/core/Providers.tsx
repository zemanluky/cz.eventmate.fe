import * as React from "react";
import {ReactNode} from "react";

export const Providers: React.FC<{children?: ReactNode}> = ({children}) => {
    // put context providers here...

    return <>
        {children}
    </>;
}