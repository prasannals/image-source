import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import ImageCategoryPicker from '../components/ImageCategoryPicker';
import { FileSystem } from 'expo';
import FolderList from '../components/FolderList';
import Strings from '../constants/Strings';

export default class ImageSelectionScreen extends React.Component {
  static navigationOptions = {
    title: 'Select Image'
  };

  PICS_PATH = Strings.imageBaseDir;

  render() {
    return (<View style={styles.container}>
        <ImageCategoryPicker
          style={{ flex: 1 }}
          showCategory={true}
          onSubmitPressed={this.onSubmitPressed.bind(this)}
        />
      </View>
    )
  }

  copyImage(dir, imageUri) {
    pathArr = imageUri.split('/');
    fName = pathArr[pathArr.length - 1];
    to = dir + fName;
    console.log('to: ' + to);
    FileSystem.copyAsync({ from: imageUri, to })
      .then(() => console.log('Copied Successfully'))
      .catch(err => console.log('Error while copying\n'+ err));
  }

  saveImage(imageUri, category) {
    console.log('save image called');
    DIR = this.PICS_PATH + category + '/';
    FileSystem.getInfoAsync(DIR)
      .then(({ exists }) => {
        if (!exists) {
          FileSystem.makeDirectoryAsync(DIR, { intermediates: true })
            .then(() => {
              this.copyImage(DIR, imageUri);
              this.props.navigation.getParam('onSubmit')();
              this.props.navigation.goBack();
            })
            .catch(err => console.log('Couldn\'t create directory\n' + err));
        } else {
          this.copyImage(DIR, imageUri);
          this.props.navigation.goBack();
        }
      })
      .catch(err => console.log('Error while getting dir info\n' + err));
  }

  onSubmitPressed(imageUri, category) {
    this.saveImage(imageUri, category);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 0,
  }
});
