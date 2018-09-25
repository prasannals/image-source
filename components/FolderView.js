import React from 'react';
import Button from 'apsl-react-native-button';
import { FileSystem } from 'expo';
import ImageGrid from '../components/ImageGrid';
import Strings from '../constants/Strings';

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

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    const imageUris = this.props.navigation.getParam(IMAGE_URIS);
    console.log('ImageUris(FolderView): ' + imageUris);
    return <ImageGrid imageUris={imageUris} navigation={this.props.navigation} />;
  }
}
