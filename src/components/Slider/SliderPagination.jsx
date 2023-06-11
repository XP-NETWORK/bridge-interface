import React, { useEffect, useRef } from "react";

export default function SliderPagination({ index, current, setCurrent }) {
    const node = useRef(null);

    const animating = index === current;

    const animationFinishHandler = () => setCurrent(index + 1);

    const handleClick = () => {
        if (animating) return;
        setCurrent(index);
    };

    useEffect(() => {
        node.current.addEventListener(
            "animationiteration",
            animationFinishHandler
        );
        return () => {
            node.current.removeEventListener(
                "animationiteration",
                animationFinishHandler
            );
        };
    }, [node]);

    return (
        <span className="pagination__bg" onClick={handleClick}>
            <span
                ref={node}
                className={`pagination__progress ${animating ? "" : "paused"}`}
            ></span>
        </span>
    );
}
