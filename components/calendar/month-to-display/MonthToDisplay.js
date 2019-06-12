import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import DayInWeek from './day-in-week/DayInWeek'
import DaysInMonth from './days-in-month/DaysInMonth'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


export default class MonthToDisplay extends React.Component{

    row_days_array // //Hold all the row of React element to display the current calendar month
    day_data_array // Hold the data to display of each day in the current calendar month

    state = {
        row_days_array: []
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, (month + 1 ), 0).getDate()    //Month should be incremented by 1 because the 'month' parameter is the month index (1-12 changed to 0-11)
                                                            //to get total days of the wanted month.
    }

    getDataOfDaysLastMonthToDisplay = (daysLastMonthToDisplay, daysLastMonth) => {
        for(let i = (daysLastMonth - daysLastMonthToDisplay + 1); i <= daysLastMonth; i++){
            this.day_data_array.push({
                day: i
            })
        }
    }

    getDataOfDaysThisMonthToDisplay = (daysThisMonth) => {
        for(let i = 1; i <= daysThisMonth; i++){
            this.day_data_array.push({
                day: i,
                main: true //To identify this object contains a day of the current month
            })
        }
    }

    getDataOfDaysNextMonthToDisplay = (daysNextMonthToDisplay) => {
        for(let i = 1; i <= daysNextMonthToDisplay; i++){
            this.day_data_array.push({
                day: i
            })
        }
    }

    componentDidMount(){
        this.day_data_array = [] //will have length of 42, since we will display the month calendar in a table of 6 rows * 7 columns = 42 cells

        let month = this.props.month_data.month,
            year = this.props.month_data.year

        let daysThisMonth = this.getDaysInMonth(month, year) //Number of days in this month
        

        let daysLastMonth //Number of days in the last month

        //To check if the current month is January or not
        //If not, then we proceed finding the total days in the last month normally
        if(month !== 0){
            daysLastMonth = this.getDaysInMonth(month, year)
        }

        //If the case, we will find the last December's total days
        else
            daysLastMonth = this.getDaysInMonth(11, (year - 1))
        
        let firstDayOfCurrentMonthInWeek = new Date(year, month, 1).getDay(), //This is the first day in month, but with the index in a week (Sun, Mon, ... Sat to 0, 1, ..., 6)
            daysLastMonthToDisplay = firstDayOfCurrentMonthInWeek !== 0 ? firstDayOfCurrentMonthInWeek - 1 : 6  //To be used to find how many days from last month should we 
                                                                                                                //display in the month calendar (Optional)

        //Push data of displaying days from last month to the array
        this.getDataOfDaysLastMonthToDisplay(daysLastMonthToDisplay, daysLastMonth)
        
        //Push data of displaying days from current month to the array
        this.getDataOfDaysThisMonthToDisplay(daysThisMonth)

        let lastDayOfCurrentMonthInWeek = new Date(year, month, daysThisMonth).getDay(),
            daysNextMonthToDisplay = lastDayOfCurrentMonthInWeek !== 0 ? 7 - lastDayOfCurrentMonthInWeek : 0 //To be used to find how many days from next month should we
                                                                                                             //display in the month calendar (Optional)
        
        //Push data of displaying days from next month to the array
        this.getDataOfDaysNextMonthToDisplay(daysNextMonthToDisplay)

        //After we get all neccessary data from last, current and next months, we need to fill the rest indexes will dummy data
        if(this.day_data_array.length < 42){
            for(let i = this.day_data_array.length; i < 42; i++){
                this.day_data_array.push({
                    day: 0
                })
            }
        }

        //This array will hold data of 7 days in a row for displaying the month calendar (there are 6 rows in total)
        this.row_days_array = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)]

        for(let i = 0; i < this.day_data_array.length; i++){
            this.row_days_array[parseInt(i / 7)].push({
                dayData: this.day_data_array[i],
                calendarDayIndex: i
            })
        }

        this.setState({
            row_days_array: [... this.row_days_array]
        })
    }

    render(){
        return(
            <>
                <View
                    style={this.props.style}
                >
                    <View style={{
                        height: 50,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "500"
                            }}
                        >
                            {monthNames[this.props.month_data.month]}
                        </Text>
                        <Text
                            style={{
                                color: "gray",
                                fontSize: 14,
                                marginLeft: 5
                            }}
                        >
                            {this.props.month_data.year}
                        </Text>
                    </View>

                    <View
                        style={{
                            // flex: 1,
                            marginTop: 10,
                        }}
                    >
                        <View 
                            style={{
                                flexDirection: "row",
                            }}
                        >
                            <DayInWeek day='M' />
                            <DayInWeek day='T' />
                            <DayInWeek day='W' />
                            <DayInWeek day='T' />
                            <DayInWeek day='F' />
                            <DayInWeek day='S' />
                            <DayInWeek day='S' />
                        </View>
                        
                        <DaysInMonth
                            row_days_array = {this.state.row_days_array}

                            month_index = {this.props.month_index}
                            current_month_index = {this.props.current_month_index}
                            chooseDifferentMonth = {this.props.chooseDifferentMonth}
                        />

                    </View>
                </View>
            </>
        )
    }
}