import React from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import Button from 'apsl-react-native-button';
import LabeledInput from '../components/LabeledInput';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';


export default class AddEndpointScreen extends React.Component {
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
