import React from 'react';

export default class HoursList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    formatTime(time) {
        let splitTime = time.split(":");
        let hourTime = parseInt(splitTime[0]);
        if (hourTime > 12) {
            return hourTime - 12 + ":" + splitTime[1] + " PM"
        }
        return hourTime + ":" + splitTime[1] + " AM"
    }

    makePHXTime(date) {
        return new Date(date.toLocaleString("en-US", {timeZone: "America/Phoenix"}));
    }

    render() {
        this.restaurantData = this.props.restaurantData;
        return (
            <div className="hoursList">
                <div className="title">Hours of Operation</div>
                {(() => {
                    let order = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    //current time in relation to Phoenix time zone
                    let currentTime = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Phoenix"}));
                    let output = [];
                    let pastDay = order[(currentTime.getDay() + 6) % 7];
                    for (let weekDay of order) {
                        let sameDay = weekDay === order[currentTime.getDay()];
                        let currentlyOpen = {
                            open: false,
                            timeSlot: undefined
                        }
                        if (sameDay && this.restaurantData.hours[weekDay]) {

                            for (let timeIndex in this.restaurantData.hours[weekDay].hours) {
                                let times = this.restaurantData.hours[weekDay].hours[timeIndex];
                                let splitStartTime = times.start.split(":").map(x => parseInt(x));
                                let startTime = new Date(new Date().setHours(splitStartTime[0], splitStartTime[1]));
                                let endTimeString = times.end;
                                if (endTimeString.includes(".")) 
                                    endTimeString = endTimeString.split(".")[1];
                                let splitEndTime = endTimeString.split(":").map(x => parseInt(x));
                                
                                let endTime = new Date(new Date().setHours(splitEndTime[0], splitEndTime[1]));
                                console.log(splitEndTime);
                                console.log(endTime);
                                if (startTime > endTime) {
                                    endTime.setDate(endTime.getDate() + 1);
                                }
                                console.log("start time: " + startTime);
                                console.log("end time: " + endTime);
                                console.log("end string: " + endTimeString);
                                if (currentTime.getTime() >= startTime.getTime() && currentTime.getTime() <= endTime.getTime()) {
                                    currentlyOpen = {
                                        open: true,
                                        timeSlot: parseInt(timeIndex)
                                    }
                                    break;
                                }
                            }

                            if (!currentlyOpen.open) {
                                let pastHours = this.restaurantData.hours[pastDay].hours;
                                let lastHour = pastHours[pastHours.length - 1];
                                if (lastHour.end.includes(".")) {
                                    let splitEndTime = lastHour.end.split(":").map(x => parseInt(x));
                                    let endTime = new Date(new Date().setHours(splitEndTime[0], splitEndTime[1]));
                                    if (endTime.getTime() >= currentTime.getTime()) {
                                        currentlyOpen.open = true;
                                    }
                                }
                                console.log(lastHour);
                            }
                        }
                        output.push(
                            <div key={weekDay} className={"hourOpen" + (currentlyOpen.open ? " isOpen" : "") + (sameDay ? " sameDay" : "")}>
                                <div className="weekDay">{weekDay}</div>
                                <div className="openTimeList">
                                    {(() => {
                                        if (!this.restaurantData.hours[weekDay])
                                            return <div className="noTime">Closed</div>;
                                        
                                        return this.restaurantData.hours[weekDay].hours.map((value, index) => <div key={index} className={"openTimeItem" + (index === currentlyOpen.timeSlot ? " isOpen" : "")}>
                                            <div className="openTime">{this.formatTime(value.start)}</div>
                                            <div className="closingTime">{this.formatTime(value.end)}</div>
                                        </div>);
                                    })()}
                                </div>
                            </div>
                        )
                    }
                    return output;
                })()}
            </div>
        );
    }
}