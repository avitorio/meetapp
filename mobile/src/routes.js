import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from './components/Header';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createStackNavigator({
          MyTab: {
            screen: createBottomTabNavigator(
              {
                Dashboard,
                Subscriptions,
                Profile,
              },
              {
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#FFF',
                  inactiveTintColor: 'rgba(255,255,255,0.6)',
                  style: {
                    backgroundColor: '#2B1A2F',
                    borderTopWidth: 1,
                    borderTopColor: '#2B1A2F',
                    paddingTop: 10,
                  },
                  indicatorStyle: {
                    backgroundColor: 'red',
                  },
                },
              }
            ),
            navigationOptions: navigation => ({
              header: <Header {...navigation} />,
            }),
            cardStyle: {
              backgroundColor: 'black',
            },
          },
        }),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
