import React from 'react';
import { 
  StyleSheet,
  View,
  FlatList,
  Dimensions
 } from 'react-native';

 import MonthToDisplay from './month-to-display/MonthToDisplay'

 export default class Calendar extends React.Component{
    month_data_array = []
    numberOfMonths = (12 * 30) + 1 //Number of months we want to display. (12 months in a year) * (number of year) + 1 (for current month)
  
    state = {
      month_data_array : [],
      current_month_index : 0, //The current selected month index. We use this to determine should we reset the style of the previous selected month calendar or not.
    }
    
    chooseDifferentMonth = (index) => {
      if(index !== this.state.current_month_index){
        this.setState({
          current_month_index : index
        })
      }
    }
  
    _keyExtractor = (item, index) => `month-calendar-${index}`
  
    _renderItem = ({item, index}) => (
      <MonthToDisplay
        style = {
          index === this.state.month_data_array.length - 1 ?
          {
            flex: 1,
            width: Dimensions.get('window').width,
            justifyContent: "center"
          }

          :

          {
            flex: 1,
            width: Dimensions.get('window').width,
            marginRight: Dimensions.get('window').width, //To create snapping effect
            justifyContent: "center"
          }
        }

        month_data = {item}

        month_index = {index}
        current_month_index = {this.state.current_month_index}
        chooseDifferentMonth = {this.chooseDifferentMonth}

      />
    )

    initializeMonths = () => {
      let currentMonth = new Date().getMonth(),
          currentYear = new Date().getFullYear()
  
      this.getFollowingMonths(currentMonth, currentYear, this.numberOfMonths)
    }
    
    getFollowingMonths = (currentMonth, currentYear, numberOfMonths) => {
      if(numberOfMonths === 0)
          return

      this.month_data_array.push({
          month: currentMonth,
          year: currentYear
      })
      
      if(currentMonth === 11){
          currentMonth = 0
          currentYear += 1
      }

      else{
          currentMonth += 1
      }

      numberOfMonths -= 1

      this.getFollowingMonths(currentMonth, currentYear, numberOfMonths)
    }

    componentDidMount(){
      this.initializeMonths()

      this.setState({
          month_data_array: [... this.month_data_array]
      })
    }

    render(){
        return (
          <View style={styles.container}>
            <FlatList
                horizontal = {true}
                decelerationRate = {0}
                snapToInterval = {(Dimensions.get('window').width) * 2}
                snapToAlignment = "start"
                showsHorizontalScrollIndicator = {false}
                keyExtractor = {this._keyExtractor}
                initialNumToRender = {1}
                removeClippedSubviews = {true}
                data = {this.state.month_data_array}
                extraData = {this.state.current_month_index}
                renderItem = {this._renderItem}
                windowSize = {10}
            >
            </FlatList>
          </View>
        );
    }
 }

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });