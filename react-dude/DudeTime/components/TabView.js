import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Colors from "../constants/Colors";
import MateList from '../screens/NewMates';

const FirstRoute = () => (
  <View style={[styles.scene]} >
    <MateList></MateList>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene]} />
);

const initialLayout = { width: Dimensions.get('window').width };


export default function TabViewExample() {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'all', title: 'All' },
    { key: 'dudecepted', title: 'Dudecepted' },
  ]);

  const renderScene = SceneMap({
    all: FirstRoute,
    dudecepted: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.green }}
      style={{ backgroundColor: Colors.grey, 
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderBottomColor: Colors.green }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: Colors.grey
  },
  scene: {
    flex: 1,
  },
});