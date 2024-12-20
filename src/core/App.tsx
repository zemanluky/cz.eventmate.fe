import * as React from 'react';
import {Providers} from "./Providers.tsx";
import {Router} from "./Router.tsx";
import {css} from "@Panda/css";

const appStyles = css({
    minHeight: "100vh",
    '@supports (min-height: 100svh)': {
        minHeight: '100svh'
    }
})

export const App: React.FC = () => {
    return (
        <Providers>
            <div className={appStyles}>
                <Router />
            </div>
        </Providers>
    )
}