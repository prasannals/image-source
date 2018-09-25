import React from 'react';
import Button from 'apsl-react-native-button';
import {
  View,
  AsyncStorage
} from 'react-native';
import Strings from '../constants/Strings';


class TrainScreen extends React.Component {
  static navigationOptions = {
    title: 'Train'
  };

  render() {
    return (<View style={styles.container}>
      <Button
        onPress={this.trainPressed.bind(this)}
        style={styles.trainButtonStyle}>
        Train
      </Button>
    </View>)
  }

  trainPressed() {
    AsyncStorage.getItem(Strings.endpoints)
      .then(endpoints => {
        endpoints = JSON.parse(endpoints);
        trainEndpoint = endpoints.trainEndpoint;
        fetch(trainEndpoint, {
          method: 'GET'
        });
        console.log('Train Request Sent');
      })
      .catch(err => console.log('Could not obtain endpoints from storage. ' + err));
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  trainButtonStyle: {
    width: '100%'
  }
}

export default TrainScreen;
