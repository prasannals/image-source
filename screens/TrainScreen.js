import React from 'react';
import Button from 'apsl-react-native-button';
import {
  View,
  AsyncStorage
} from 'react-native';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';

class TrainScreen extends React.Component {
  static navigationOptions = {
    title: 'Train'
  };

  render() {
    console.log(ConstObj.buttonTextStyle);
    return (<View style={styles.container}>
      <Button
        textStyle={ConstObj.buttonTextStyle}
        onPress={this.trainPressed.bind(this)}
        style={ConstObj.buttonStyle}>
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
    alignItems: 'center',
    backgroundColor: '#fff'
  }
}

export default TrainScreen;
