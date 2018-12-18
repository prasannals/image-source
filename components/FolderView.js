import React from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import Button from 'apsl-react-native-button';
import { FileSystem } from 'expo';
import ImageGrid from '../components/ImageGrid';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';

const IMAGE_URIS = 'imageUris';

export default class SettingsScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('folderName'),
      headerRight: (
        <Button onPress={() => {
          folderName = navigation.getParam('folderName');
          folderUri = Strings.imageBaseDir + folderName + '/';

          FileSystem.deleteAsync(folderUri)
            .then(() => {
              console.log('Deleted Successfully');
              navigation.getParam('onDelete')(folderName);
              navigation.goBack();
            })
            .catch(err => console.log('Could not delete file. ' + err))
        }}>
          Delete Folder
        </Button>
      )
    }
  }

  componentDidMount() {
    // FileSystem.readDirectoryAsync(this.PICS_PATH)
    //   .then(arr => {
    //     arr = arr.map(item => this.PICS_PATH + item);
    //     console.log('Images: ' + arr);
    //     this.setState({ imageUris:  arr});
    //   })
    //   .catch(err => console.log('Couldn\'t read directory\n' + err));

  }

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


  sendAllImages(uris, category) {
    console.log(uris);
    console.log(category);
    uris.map(uri => {
      this.sendToServer(uri, category)
        .then(() => console.log('Image Sent'))
        .catch(err => console.log('Could not send image ' + err))
    });
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    const category = this.props.navigation.getParam('folderName');
    const imageUris = this.props.navigation.getParam(IMAGE_URIS);
    console.log('ImageUris(FolderView): ' + imageUris);
    return (<View style={{flex:1}}>
      <View style={{flex:1}}>
        <ImageGrid
          category={category}
          imageUris={imageUris}
          navigation={this.props.navigation}
        />
      </View>
      <Button
        textStyle={ConstObj.buttonTextStyle}
        style={ConstObj.buttonStyle}
        onPress={() => this.sendAllImages.bind(this)(imageUris, category)}
      >
      Send all images in folder to server
      </Button>
    </View>);
  }
}
