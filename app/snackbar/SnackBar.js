import React, {Component} from 'react';

import {
    View,
    Animated,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

class SnackBar extends Component {
    constructor(props) {
        super(props);
        this.handleActionButton = this.handleActionButton.bind(this);
        this.backgroundColor = this.props.backgroundColor || '#29303F';
        this.textColor = this.props.textColor || '#FFFFFF';
        this.actionTextColor = this.props.actionTextColor || 'green';
        this.onDismiss = this.props.onDismiss;
        this.onActionProcess = this.props.onActionProcess;

        this.snackBarStyles = {
            style: {
                backgroundColor: this.backgroundColor
            }
        };
    }
    componentWillReceiveProps(newProps){
        if(newProps.show){
            this.hideTime =  setTimeout(() => {
                this.onDismiss && this.onDismiss();
            }, 5000)
        }
    }
    handleActionButton(e){
        this.onActionProcess && this.onActionProcess();
    }
    render() {
        return this.props.show ?
            (<Animated.View style={[this.snackBarStyles.style, this.props.style, styles.container]}>
                <Text style={[styles.text, {color : this.textColor}]}>{this.props.message}</Text>
                <TouchableHighlight
                    onPress={this.handleActionButton}>
                    <Text style={[styles.actionStyle,{color : this.actionTextColor}]}>{this.props.actionText}</Text>
                </TouchableHighlight>
            </Animated.View> )
            : null ;
    }

}

const styles = StyleSheet.create({
    text: {
        marginHorizontal: 20,
        marginVertical: 12,
        fontSize: 14,
        width:260
    },
 actionStyle:{
    marginRight: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: 13,
    marginHorizontal: 50,
    fontWeight:'bold',
    marginVertical: 12
},
    container: {
        flex: 1,
        flexDirection:'row',
        flexWrap:'wrap',
        position: 'absolute',
        bottom: 0
    }
});

module.exports = SnackBar;
