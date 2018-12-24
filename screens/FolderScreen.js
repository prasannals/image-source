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
import NetworkUtil from '../util/NetworkUtil';

const IMAGE_URIS = 'imageUris';

export default class FolderScreen extends React.Component {

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


  sendAllImages(uris, category) {
    console.log(uris);
    console.log(category);
    uris.map(uri => {
      NetworkUtil.sendToServer(uri, category)
        .then(() => console.log('Image Sent'))
        .catch(err => console.log('Could not send image ' + err))
    });
  }

  render() {
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
