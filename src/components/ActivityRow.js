import React from 'react';
import moment from "moment";

const runningImage = "/images/running.png";
const cyclingImage = "/images/cycling.png";
const activityDataTypes = {
    cycling : {
        title: "Vélo",
        image: cyclingImage
    },
    running : {
        title: "Course",
        image: runningImage
    }
};

const getDataUiInfoByType = (type) => {
    switch (type) {
        case "Cycling":
            return activityDataTypes.cycling;
        case "Running":
            return activityDataTypes.running;
        default:
            return activityDataTypes.running;
    }
};


const ActivityRow = ({type, distance, duration}) => {
    const convertedDistance = Math.round((distance / 1000) * 100) / 100; // CONVERT DISTANCE IN KM
    const momentDuration    = moment.duration(duration, 'seconds'); // GET MOMENT DURATION
    const convertedDuration = moment(momentDuration.asMilliseconds()).format("hh[h]mm"); // GET FORMATED DURATI

    return (
        <div className={"App-activity"}>
            <div className={"App-activity__image"}>
                <img alt={type} className={"App-activity__image"} src={getDataUiInfoByType(type).image}/>
            </div>
            <div className={"App-activity__content"}>
                <div className={"App-activity__content__type"}>{getDataUiInfoByType(type).title}</div>
                <div>{`${convertedDistance} km`}</div>
            </div>
            <div >
                {convertedDuration}
            </div>
        </div>
    );
};

export default ActivityRow;
