import * as React from "react";
import { useState } from "react";
import { Button } from "@ParkComponents/button.tsx";
import { css } from "@Panda/css";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";


export const Navbar: React.FC = () => {
	const navBarStyles = css({
		w: "100%",
		h: "100px",
		paddingX: { base: "16px", sm: "48px" },
		display: "flex",
        gap:"60px",
		alignItems: "center",
		bg: "bg.navbar",
		boxShadow: "0px 4px 1px 0px var(--colors-neutrals-olive-3, #EFF1EF)",
	});

    const inputStyles = css({
        width:"100%",
        border:"1px solid #EFF1EF",
        color:"card"
    })

	const flexStyles = css({
		display: "flex",
		alignItems: "center",
		gap:"20px"
	})

	return (
		<>
			<div className={navBarStyles}>
				<Text fontSize={"xl"}>EventMate</Text>
                <Input size="sm" id="name" placeholder="Search" className={inputStyles}/>
                <div className={flexStyles}>
					<Button bg="bg.buttonSmall" color="fg.buttonSmall" borderRadius={"full"}>F</Button>
					<Button variant="ghost" bg="none" borderRadius={"full"} border={"1px solid gray"}>P</Button>
				</div>
			</div>
		</>
	);
};
