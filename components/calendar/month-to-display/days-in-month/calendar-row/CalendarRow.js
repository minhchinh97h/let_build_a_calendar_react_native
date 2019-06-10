import React from 'react'

import {
    View
} from 'react-native';

import DayHolder from './day-holder/DayHolder'
import DummyHolder from './dummy-holder/DummyHolder'

export default class CalendarRow extends React.PureComponent{

    render(){
        return(
            //Rendering each row
            <View
                style={{
                    flexDirection: "row"
                }}
            >
                {this.props.rowData.map((data, index) => {
                    if(data.dayData.main){
                        return(
                            <DayHolder
                                key={"day holder " + data.calendarDayIndex}

                                day = {data.dayData.day}

                                calendarDayIndex = {data.calendarDayIndex}
                                lastCalendarDayIndex = {this.props.lastCalendarDayIndex}
                                changeCurrentCalendarDayIndex = {this.props.changeCurrentCalendarDayIndex}

                                month_index = {this.props.month_index}
                                current_month_index = {this.props.current_month_index}
                                chooseDifferentMonth = {this.props.chooseDifferentMonth}
                            />
                        )
                    }

                    else{
                        return(
                            <DummyHolder
                                key={"dummy holder "+ data.calendarDayIndex}

                                day = {data.dayData.day}
                            />
                        )
                    }
                })}

            </View>
        )
    }
}