import React from 'react'

import CalendarRow from './calendar-row/CalendarRow'

export default class DaysInMonth extends React.PureComponent{

    state = {
        lastCalendarDayIndex: 0, //To keep track of the last chosen day in the month (for resetting its style)
        currentCalendarDayIndex: 0, //Keeping track of the current chosen day in the month (for changing its style to proper one)
    }

    //If we choose a different day in the month, then this function will be called
    changeCurrentCalendarDayIndex = (index) => {
        this.setState({
            currentCalendarDayIndex: index
        })
    }


    //After we get the currentCalendarDayIndex, we set the lastCalendarDayIndex to the previous currentCalendarDayIndex
    componentDidUpdate(prevProps, prevState){
        if(this.state.currentCalendarDayIndex !== prevState.currentCalendarDayIndex){
            this.setState({
                lastCalendarDayIndex: prevState.currentCalendarDayIndex
            })
        }
    }

    render(){
        return(
            <>
                {
                    this.props.row_days_array.map((rowData, index) => (
                        <CalendarRow 
                            key = {'calendar row ' + index}
                            rowData = {rowData}

                            lastCalendarDayIndex = {this.state.lastCalendarDayIndex}
                            changeCurrentCalendarDayIndex = {this.changeCurrentCalendarDayIndex}

                            month_index = {this.props.month_index}
                            current_month_index = {this.props.current_month_index}
                            chooseDifferentMonth = {this.props.chooseDifferentMonth}
                        />
                    ))
                }
            </>
        )
    }


}