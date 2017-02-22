import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
let SnackBar = require("./snackbar/SnackBar");

class App extends Component {

    constructor(props) {
        super(props);
        this.dataSrc = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.complexRows = [
            {"id":'1',"subject":"ABC","content":"This is content of ABC"},
            {"id":'2',"subject":"DEF","content":"This is content of DEF"},
            {"id":'3',"subject":"GHI","content":"This is content of GHI"},
            {"id":'4',"subject":"IJK","content":"This is content of IJK"},
            {"id":'5',"subject":"LMN","content":"This is content of LMN"},
            {"id":'6',"subject":"OPQ","content":"This is content of OPQ"},
            {"id":'7',"subject":"RST","content":"This is content of RST"},
            {"id":'8',"subject":"UVW","content":"This is content of UVW"},
            {"id":'9',"subject":"XYZ","content":"This is content of XYZ"},
        ];

        this.state = {
            dataSource: this.dataSrc.cloneWithRows(this.complexRows),
            showSnackBar:false,
            message:"Select a row !!",
            actionText:"UNDO",
            selectedRow:{}
        };
    }
    selectItem(rowData) {

        let data = this.complexRows;
        let index = data.findIndex(rec => rec.id==rowData.id);
        data.splice(index,1);
        this.setState({
            dataSource: this.dataSrc.cloneWithRows(data),
            showSnackBar: true,
            selectedRow:rowData,
            message:rowData.subject + " archived !!"
        })
    }

    renderRow(rowData){
        return (
            <TouchableOpacity style={{borderColor:"#333333", borderRadius: 5}} onPress={this.selectItem.bind(this,rowData)}>
            <View>
                <View style={ListStyles.rowContainer}>
                    <View  style={ListStyles.textContainer}>
                        <Text style={ListStyles.title}>{rowData.subject}</Text>
                        <Text style={ListStyles.description} numberOfLines={0}>{rowData.content}</Text>
                    </View>
                </View>
                <View style={ListStyles.separator}/>
            </View>
            </TouchableOpacity>
        );
    }
    render() {

        return(
            <View style={styles.container}>

                <ListView
                ref="listview"
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={true}/>




                    <View style={styles.snackBarStyles}>
                        <SnackBar message = {this.state.message}
                                  show = {this.state.showSnackBar}
                                  style={{width:Dimensions.get('window').width}}
                                  onDismiss={this.onDismiss.bind(this)}
                                  actionText={this.state.actionText}
                                  actionTextColor="red"
                                  onActionProcess={this.onActionProcess.bind(this)} />
                    </View>


            </View>
        );
    }
    onActionProcess(){
        let data = this.complexRows;
        let index = data.findIndex(rec => rec.id>this.state.selectedRow.id);
        data.splice(index,0,this.state.selectedRow);
            this.setState({
                dataSource: this.dataSrc.cloneWithRows(data),
                selectedRow:{}
                // showSnackBar:false
            });
            this.dismissSnackbar();

    }
    componentDidMount(){
        // alert('1');
        this.mounted = true;
    }
    showSnackbar() {
        this.setState({
            showSnackBar: true
        });
    }
    onDismiss(){
        this.dismissSnackbar();
    }

    dismissSnackbar() {
        this.setState({
            showSnackBar: false
        });
    }

}

const ListStyles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#E3E0D7'
    },
    title: {
        color: '#3D728E',
        fontFamily: 'Rokkitt',
        fontSize: 20,
    },
    description: {
        color: '#7C705F',
        fontFamily: 'Josefin Sans',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
        textAlign: 'left',
    }


});

const styles = StyleSheet.create({

    container : {
        flex: 1
    },

    snackBarStyles: {
    }
});

module.exports = App;