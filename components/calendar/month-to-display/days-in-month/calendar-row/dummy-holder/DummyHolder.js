import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class DummyHolder extends React.PureComponent{

    render(){
        return(
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 5,
                }}
            >
                <View
                    style={styles.DummyDayHolder}
                >
                    <Text
                        style={styles.DummyDayText}
                    >
                        {this.props.day > 0 ?
                            this.props.day

                            :

                            ""
                        }
                    </Text>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    DummyDayHolder: {
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "white"
    },

    DummyDayText: {
        color: 'gainsboro'
    },
})