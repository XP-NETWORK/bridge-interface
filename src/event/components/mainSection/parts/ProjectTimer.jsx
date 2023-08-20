import { useEffect, useState } from "react";

//import { ReduxState } from "store";
import moment from "moment";
//import { TimeLoader } from "components/timeLoader";
import React from "react";

const period = ["d", "h", "m", "s"];

// import { useWindowSize } from "hooks/useSize";

export const ProjectTimer = ({ text, date, onTimeUp }) => {
    //const project = useSelector((state) => state.global.project);
    const [tick, setTick] = useState("");
    // const timeLeft = "30:360:21600";
    const time = tick.split(":");

    // const size = useWindowSize();
    // const ismobile = Number(size?.width) <= 548;

    useEffect(() => {
        let int;
        if (date) {
            // const endDate = new Date(project?.endDate);
            const time = moment(date);
            int = setInterval(async () => {
                const timeDiff =
                    time.toDate().getTime() -
                    moment()
                        .toDate()
                        .getTime();

                if (timeDiff <= 0) {
                    clearInterval(int);
                    onTimeUp(true);
                    return;
                }

                const d = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const h = Math.floor(
                    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const m = String(
                    Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
                );
                const s = String(Math.floor((timeDiff % (1000 * 60)) / 1000));

                setTick(`${d}:${h}:${m}:${s}`);
            }, 1000);
        }
        return () => clearInterval(int);
    }, [date]);

    return (
        <span>
            {text}
            {time.map((digit, i) => `${digit}${period[i]} `)}
        </span>
    );
};
