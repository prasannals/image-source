import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import ImageCategoryPicker from '../components/ImageCategoryPicker';
import { FileSystem } from 'expo';
import Button from 'apsl-react-native-button';
import FolderList from '../components/FolderList';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';
import NetworkUtil from '../util/NetworkUtil';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Data'
  };

  PICS_PATH = Strings.imageBaseDir;

  state = {
    folders: []
  }

  componentWillMount() {
    this.refresh();
  }

  onDeleteFolder(folderName) {
    folders = this.state.folders.filter(item => item !== folderName);
    this.setState({folders});
  }

  refresh() {
    // console.log('Refresh called');
    this.getFolders();
  }

  render() {
    return (<View style={styles.container}>
        <FolderList
          folders={this.state.folders}
          navigation={this.props.navigation}
          onDeleteFolder={this.onDeleteFolder.bind(this)}
        />
        <Button
          textStyle={ConstObj.buttonTextStyle}
          style={ConstObj.buttonStyle}
          onPress={() => this.props.navigation.navigate('ImageSelectionScreen', {
            onSubmit: this.refresh.bind(this)
          })}
        >
        Add Image
        </Button>

        <Button
          textStyle={ConstObj.buttonTextStyle}
          style={ConstObj.buttonStyle}
          onPress={this.sendAllImages.bind(this)}
        >
        Send all images to server
        </Button>

      </View>);
  }

  sendFolderImages(folderName) {
    const folderDir = Strings.imageBaseDir + folderName + '/';
    console.log('FOLDER DIR: ' + folderDir);
    FileSystem.readDirectoryAsync(folderDir)
      .then(arr => {
        arr = arr.map(item => folderDir + item);
        console.log("sending: "+ arr);
        arr.map(uri => NetworkUtil.sendToServer(uri, folderName).then(() => console.log('sent')).catch(err => console.log('failed to send')) );
      })
      .catch(err => console.log('Couldn\'t read directory\n' + err));
  }

  sendAllImages() {
    this.state.folders.map(folder => this.sendFolderImages(folder));
    alert('Images Sent to Server');
  }

  getFolders() {
    DIR = this.PICS_PATH;

    FileSystem.getInfoAsync(DIR)
      .then(({ exists }) => {
        if (!exists) {
          console.log('Image Folder doesn\'t exist');
          this.setState({folders: []});
        } else {
          Expo.FileSystem.readDirectoryAsync(DIR)
            .then(arr => {
              console.log('Got list of folders');
              console.log(arr);
              this.setState({folders: arr});
            })
            .catch(err => console.log('Couldn\'t read directory\n' + err));
        }
      })
      .catch(err => console.log('Error while getting dir info(getFolders)\n' + err));
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 0,
    backgroundColor: '#fff'
  }
});
