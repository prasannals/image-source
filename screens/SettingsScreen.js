import React from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import Button from 'apsl-react-native-button';
import LabeledInput from '../components/LabeledInput';
import Strings from '../constants/Strings';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    dataEndpoint: '',
    trainEndpoint: '',
    predictEndpoint: ''
  }

  componentDidMount() {
    AsyncStorage.getItem(Strings.endpoints)
      .then(endpoints => {
        endpoints = JSON.parse(endpoints);
        this.setState(endpoints);
      })
      .catch(err => console.log('Could not obtain endpoints from storage. ' + err));
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (<View style={styles.container}>
      <View style={styles.settingStyle}>
        <LabeledInput
          label="Data Endpoint"
          value={this.state.dataEndpoint}
          onChangeText={(text) => this.setState({dataEndpoint: text})}
        />
        <LabeledInput
          label="Train Endpoint"
          value={this.state.trainEndpoint}
          onChangeText={(text) => this.setState({trainEndpoint: text})}
        />
        <LabeledInput
          label="Predict Endpoint"
          value={this.state.predictEndpoint}
          onChangeText={(text) => this.setState({predictEndpoint: text})}
        />
      </View>
      <Button
        onPress={this.saveEndpoints.bind(this)}
      >
      Save
      </Button>
    </View>);
  }

  saveEndpoints() {
    AsyncStorage.setItem(Strings.endpoints, JSON.stringify(this.state))
      .then(() => {
        console.log('Endpoints saved');
        alert('Settings saved');
      })
      .catch(err => console.log('Could not save endpoints. ' + err));
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  settingStyle: {
    flex: 1
  }
}
