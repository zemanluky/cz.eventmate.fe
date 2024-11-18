import * as React from "react";
import {useState} from "react";
import {Button} from "@ParkComponents/button.tsx";
import { EventToolbar } from "@Components/ui/EventToolbar";

export const Homepage: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (<>
        <EventToolbar />
        <Button
            variant='ghost'
            onClick={() => setCount(prev => prev + 1)}
        >
            +1
        </Button>
    </>);
}