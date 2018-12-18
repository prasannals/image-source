import React from 'react';
import {
  View,
  AsyncStorage,
  Text,
  TouchableOpacity
} from 'react-native';
import Button from 'apsl-react-native-button';
import { Ionicons } from '@expo/vector-icons';
import RadioGroup from '../components/RadioButtonsGroup';
import LabeledInput from '../components/LabeledInput';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  willFocus = this.props.navigation.addListener(
    'willFocus',
    payload => {
      console.log('focus');
      this.updateScreen();
    }
  );

  updateScreen() {
    this.setState(this.state);
  }

  state = {
    endpoints: [

     ]
  }

  endPointToStr(host, port ){
    return 'http://' + host + ':' + String(port)
  }

  onAddEndpoint(host, port) {
    const endpoint = {label: this.endPointToStr(host, port), value: {host, port}, selected: true};
    this.state.endpoints = this.state.endpoints.map(endpoint => ({...endpoint, selected:false}) );

    this.state.endpoints = this.state.endpoints.concat(endpoint);
    console.log(this.state);
    this.saveEndpoints(this.state);
    this.setState(this.state);
  }

  componentDidMount() {
    console.log('component mount');
    AsyncStorage.getItem(Strings.endpoints)
      .then(endpoints => {
        console.log('Got result');
        endpoints = JSON.parse(endpoints);
        console.log(endpoints);
        this.setState(endpoints);
      })
      .catch(err => console.log('Could not obtain endpoints from storage. ' + err));
  }

  onSelectRadioButton(data) {
    const newEnds = {endpoints: data}
    this.saveEndpoints(newEnds)
    this.setState(newEnds)
  }

  onDeletePressed(data) {
    const delIdx = this.state.endpoints.findIndex(e => e.label === data.label);
    this.state.endpoints.splice(delIdx, 1)
    this.saveEndpoints(this.state);
    this.setState(this.state)
  }

  renderRadioButton(data) {
    return (<View style={{flexDirection: 'row', paddingLeft:10, paddingRight:12, flex: 1, alignItems: 'center'}}>
      <Text style={{alignSelf: 'center'}}>{data.label}</Text>
      <View style={{flex:1}}/>
      <TouchableOpacity onPress={() => this.onDeletePressed.bind(this)(data)}>
        <Ionicons name="ios-trash" size={32} />
      </TouchableOpacity>
    </View>)
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
     // console.log(this.state);

    return (<View style={styles.container}>
      <RadioGroup
        radioButtons={this.state.endpoints}
        render={this.renderRadioButton.bind(this)}
        onPress={this.onSelectRadioButton.bind(this)}
      />
      <Button
        textStyle={ConstObj.buttonTextStyle}
        style={ConstObj.buttonStyle}
        onPress={() => this.props.navigation.navigate('AddEndpointScreen', {
          'onAddEndpoint': this.onAddEndpoint.bind(this)
        })}
      >
      Add
      </Button>
    </View>);
  }

  saveEndpoints(state) {
    AsyncStorage.setItem(Strings.endpoints, JSON.stringify(state))
      .then(() => {
        console.log('Endpoints saved');
        // alert('Settings saved');
      })
      .catch(err => console.log('Could not save endpoints. ' + err));
  }
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
  },
  settingStyle: {
    flex: 1
  }
}
