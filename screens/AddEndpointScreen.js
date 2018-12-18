import React from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import Button from 'apsl-react-native-button';
import LabeledInput from '../components/LabeledInput';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    host: '',
    port: '',
  }

  endPointToStr(host, port){
    return 'http://' + host + ':' + String(port)
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */

    return (<View style={styles.container}>
      <LabeledInput
        label='Host'
        value={this.state.host}
        onChangeText={text => this.setState({...this.state, host:text})}
      />
      <LabeledInput
        label='Port'
        value={this.state.port}
        onChangeText={text => this.setState({...this.state, port:text})}
      />
      <Button
        textStyle={ConstObj.buttonTextStyle}
        style={ConstObj.buttonStyle}
        onPress={() => {
          this.props.navigation.state.params.onAddEndpoint(this.state.host, this.state.port);
          this.props.navigation.goBack();
        }}
      >
      Save
      </Button>
    </View>);
  }

  // saveEndpoints(host, port) {
  //   AsyncStorage.getItem(Strings.endpoints)
  //     .then(endpoints => {
  //       endpoints = JSON.parse(endpoints);
  //       endpoints = endpoints.map(endpoint => ({...endpoint, selected:false}) )
  //       endpoints.concat({label: this.endPointToStr(host, port),value: {host:host, port:port}, selected: true })
  //
  //       AsyncStorage.setItem(Strings.endpoints, JSON.stringify(endpoints))
  //         .then(() => {
  //           console.log('Endpoints saved');
  //           alert('Settings saved');
  //           this.props.navigation.goBack();
  //         })
  //         .catch(err => console.log('Could not save endpoints. ' + err));
  //     })
  //     .catch(err => console.log('Could not obtain endpoints from storage. ' + err));
  //
  // }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 0,
    alignItems: 'flex-start'
  }
}
