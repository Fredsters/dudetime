import React from 'react';
import { TextInput, StyleSheet, Text, View, FlatList, Dimensions, StatusBar } from 'react-native';
import DudePic from './DudePic';
import DudeListItem from "./DudeListItem"
import { TabView, SceneMap } from 'react-native-tab-view';

export default class DudePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
            userContacts: this.props.userContacts,
            index: 0,
            routes: [
                { key: 'user', title: 'Users' },
                { key: 'group', title: 'Groups' },
            ],
        };
    }

    _keyExtractor = (item, index) => item._id;

    _renderItem = ({ item }) => (
        < DudeListItem
            source={{ uri: item.picturePath }}
            name="Peter The guy"
            Selected={false}
        />
    );

    _renderSelectedItem = ({ item }) => (
        < DudePic
            source={{ uri: item.picturePath }}
            name="Peter The guy"
            size={70}
        />
    );

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'user':
                return <FlatList
                    data={this.state.userContacts}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />;
            case 'group':
                return <FlatList
                    data={this.state.userGroups}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />;
            default:
                return null;
        }
    };

    render() {
        return (
            <View style={styles.scene}>
                <TextInput placeholder="search ">

                </TextInput>

                <FlatList
                    data={this.state.userContacts}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderSelectedItem}
                    horizontal={true}
                />

                <TabView
                    navigationState={{ routes: this.state.routes, index: this.state.index }}
                    renderScene={this.renderScene}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    style={styles.container}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    container: {
        marginTop: StatusBar.currentHeight
    },
});

//  connect(mapStateToProps, mapDispatchToProps)(DudePicker);
