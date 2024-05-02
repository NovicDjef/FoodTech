/* eslint-disable prettier/prettier */
import {Provider} from 'react-redux';
import store from './app/redux/store';
import Navigation from './app/navigations/navigation';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs();


  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
