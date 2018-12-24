import React from 'react';
import {
  Image,
  View,
  AsyncStorage
} from 'react-native';
import Button from 'apsl-react-native-button';
import { FileSystem } from 'expo';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';

class ImageScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Image',
    headerRight: (
      <Button onPress={() => {
        imageUri = navigation.getParam('imageUri');

        FileSystem.deleteAsync(imageUri)
          .then(() => {
            console.log('Deleted Successfully');
            navigation.getParam('onDelete')(imageUri);
            navigation.goBack();
          })
          .catch(err => console.log('Could not delete file. ' + err))
      }}>
        Delete
      </Button>
    )
  })

  async sendToServer(imageUri, category) {
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

  render() {
    imageUri = this.props.navigation.getParam('imageUri');
    category = this.props.navigation.getParam('category');

    return (<View style={{flex:1}}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUri}}
          style={styles.imageStyle}
          resizeMode='contain'
        />
      </View>
      <Button
        textStyle={ConstObj.buttonTextStyle}
        style={ConstObj.buttonStyle}
        onPress={() => this.sendToServer(imageUri, category).then(() => console.log('Image Sent')).catch(err => console.log('Could not send image ' + err))}
      >
      Send image to server
      </Button>
    </View>
  );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: '100%',
    height: 300
  }
}

export default ImageScreen;
