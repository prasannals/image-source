import React from 'react';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import ImageCategoryPicker from '../components/ImageCategoryPicker';
import Strings from '../constants/Strings';

export default class PredictScreen extends React.Component {
  static navigationOptions = {
    title: 'Predict',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageCategoryPicker
          style={{ flex: 1 }}
          showCategory={false}
          onSubmitPressed={this.onSubmitPressed}
        />
      </ScrollView>
    );
  }

  onSubmitPressed(imageUri) {
    AsyncStorage.getItem(Strings.endpoints)
      .then(endpoints => {
        endpoints = JSON.parse(endpoints);
        endpoint = endpoints.predictEndpoint;

        var photo = {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'image.jpg'
        };

        var body = new FormData();
        body.append('image', photo);


        var xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint);
        xhr.onload = () => {
          console.log(xhr.response);
          alert('Prediction: ' + xhr.response);
        }
        xhr.send(body);
        console.log('Data sent to :' + endpoint);


      })
      .catch(err => console.log('Could not obtain endpoints from storage. ' + err));
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
