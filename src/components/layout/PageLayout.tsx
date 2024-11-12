import * as React from "react";
import { css } from "@Panda/css";
import { useLocation } from "react-router-dom";

interface PageLayoutProps {
	children: React.ReactNode;
}
export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
	const layoutStyles = css({
		w: {base:`calc(100% - 20px)`, sm:`calc(100% - 180px)`},
        mt: {base:"16px", sm:"20px"},
		mx: "auto",
	});

    const layoutStylesAuthPage = css({
		w: "100%",
        h: "100vh",
	});

    const { pathname } = useLocation();
    const isAuth = pathname === "/auth"

	return <div className={isAuth ? layoutStylesAuthPage : layoutStyles}>{children}</div>;
};
