import Reactotron, { asyncStorage } from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: '192.168.1.105' })
    .useReactNative({
      networking: {
        ignoreContentTypes: /^(image)\/.*$/i,
        ignoreUrls: /\/(logs|symbolicate)$/,
      },
    })
    .use(asyncStorage())
    .connect();
}
