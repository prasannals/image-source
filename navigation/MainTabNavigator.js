import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PredictScreen from '../screens/PredictScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FolderView from '../components/FolderView';
import ImageScreen from '../components/ImageScreen';
import ImageSelectionScreen from '../screens/ImageSelectionScreen';
import TrainScreen from '../screens/TrainScreen';

const DataStack = createStackNavigator({
  Home: HomeScreen,
  FolderView: FolderView,
  ImageScreen: ImageScreen,
  ImageSelectionScreen: ImageSelectionScreen
},{
  initialRouteName: 'Home'
});

DataStack.navigationOptions = {
  tabBarLabel: 'Data',
  tabBarIcon: ({ focused, tintColor }) => (
    <FontAwesome name={'database'} size={25} color={tintColor} />
  ),
};

const TrainStack = createStackNavigator({
  Home: TrainScreen
},{
  initialRouteName: 'Home'
});

TrainStack.navigationOptions = {
  tabBarLabel: 'Train',
  tabBarIcon: ({ focused, tintColor }) => (
    <FontAwesome name={'gears'} size={25} color={tintColor} />
  ),
};

const PredictStack = createStackNavigator({
  Links: PredictScreen,
});

PredictStack.navigationOptions = {
  tabBarLabel: 'Predict',
  tabBarIcon: ({ focused, tintColor }) => (
    <MaterialCommunityIcons name={'cloud-check'} size={25} color={tintColor} />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  DataStack,
  TrainStack,
  PredictStack,
  SettingsStack,
},
{
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});
