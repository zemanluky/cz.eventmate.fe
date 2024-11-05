import * as React from "react";
import {useState} from "react";
import {Button} from "@ParkComponents/button.tsx";

export const Homepage: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (<>
        <p>Count: {count}</p>
        <Button
            variant='ghost'
            onClick={() => setCount(prev => prev + 1)}
        >
            +1
        </Button>
    </>);
}