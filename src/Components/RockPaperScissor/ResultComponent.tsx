import { useEffect, useState } from "react";

interface Props {
    children: any;
    waitBeforeShow?: number;
}

const ResultComponent = ({ children, waitBeforeShow = 500 }: Props) => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        const delayTime = setTimeout(() => {
            setIsShown(true);
        }, waitBeforeShow);

        return () => {
            clearTimeout(delayTime);
        };
    }, [waitBeforeShow]);

    return isShown ? children : null;
};

export default ResultComponent;
