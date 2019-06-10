import React, { Component } from 'react'

import {
    View,
    Text,
} from 'react-native';

export default class DayInWeek extends React.PureComponent{
    render(){
        return(
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        color: "gray",
                    }}
                >
                    {this.props.day}
                </Text>
            </View>
        )
    }
}