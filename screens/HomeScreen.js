import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import ImageCategoryPicker from '../components/ImageCategoryPicker';
import { FileSystem } from 'expo';
import FolderList from '../components/FolderList';
import Strings from '../constants/Strings';

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
    console.log('Refresh called');
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
          style={styles.selectImageButtonStyle}
          title={'Select Image'}
          onPress={() => this.props.navigation.navigate('ImageSelectionScreen', {
            onSubmit: this.refresh.bind(this)
          })}
        />
      </View>);
  }

  getFolders() {
    DIR = this.PICS_PATH;

    FileSystem.getInfoAsync(DIR)
      .then(({ exists }) => {
        if (!exists) {
          console.log('Image Folder doesn\'t exist');
          this.setState({folders: ['Image folder does not exist']});
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
    backgroundColor: '#fff'
  },
  selectImageButtonStyle: {

  }
});
