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

export default class HomeScreen extends React.Component {
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

  sendToServer(imageUri, category) {

    AsyncStorage.getItem(Strings.endpoints)
      .then(endpoints => {
        endpoints = JSON.parse(endpoints);
        endpoint = endpoints.dataEndpoint;

        var photo = {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'image.jpg'
        };

        var body = new FormData();
        body.append('image', photo);
        body.append('category', category);

        console.log('Sending data to :' + endpoint);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint);
        xhr.onload = () => {
          console.log(xhr.response);
        }
        xhr.send(body);
        console.log('Data sent to :' + endpoint);

      })
      .catch(err => console.log('Could not obtain endpoints from storage. ' + err));

  }

  onSubmitPressed(imageUri, category) {
    console.log('Image Uri : ' + imageUri);
    console.log('Category : ' + category);
    // console.log(this);
    console.log('submit pressed called');
    this.saveImage(imageUri, category);
    this.sendToServer(imageUri, category);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
