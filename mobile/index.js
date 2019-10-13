/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings([
  //'Warning: Async Storage has been extracted',
  // 'Battery state',
  // 'componentWillMount',
  // 'componentWillUpdate',
  // 'componentWillReceiveProps',
  // '[location] ERROR - 0',
  // 'Warning: DatePickerAndroid', // will be fixed with https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/262
  'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
]);

AppRegistry.registerComponent(appName, () => App);
