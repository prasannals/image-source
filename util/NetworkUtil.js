import {
  AsyncStorage
} from 'react-native';
import Strings from '../constants/Strings';

async function sendToServer(imageUri, category) {
  let endpoints = await AsyncStorage.getItem(Strings.endpoints);

  endpoints = JSON.parse(endpoints);
  endpoint = endpoints.endpoints.find(e => e.selected);
  endpoint = 'http://' + endpoint.value.host + ':' + String(endpoint.value.port);
  endpoint = endpoint + '/data';

  const uri = imageUri;

  const photo = {
      uri: uri,
      type: 'image/jpeg',
      name: 'image.jpg'
  };

  console.log(imageUri);
  console.log(category);

  const body = new FormData();
  body.append('image', photo);
  body.append('category', category);

  console.log('Sending data to :' + endpoint);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', endpoint);
  xhr.onload = () => {
    console.log(xhr.response);
  }
  xhr.send(body);
  console.log('Data sent to :' + endpoint);

}

export default {
  sendToServer
}
