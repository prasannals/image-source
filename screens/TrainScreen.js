import React from 'react';
import Button from 'apsl-react-native-button';
import {
  View,
  AsyncStorage,
  TextInput
} from 'react-native';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';

class TrainScreen extends React.Component {
  static navigationOptions = {
    title: 'Train'
  };

  state = {
    paramViews: [],
    params: []
  }

  createParamView(idx, onChangeKey, onChangeValue){
    return (<View key={idx} style={{flex:1, flexDirection:'row'}}>
      <TextInput
        placeholder={'Key'}
        style={styles.textInputStyle}
        onChangeText={onChangeKey}
        editable={true}
      />
      <TextInput
        placeholder={'Value'}
        style={styles.textInputStyle}
        onChangeText={onChangeValue}
        editable={true}
      />
    </View>);
  }

  addParamPressed() {
    idx = this.state.paramViews.length;
    this.state.params = this.state.params.concat({key:'', value:''})
    this.state.paramViews = this.state.paramViews.concat(this.createParamView(idx,
                          key => this.state.params[idx].key = key,
                          value => this.state.params[idx].value = value))
    console.log(this.state);
    this.setState(this.state);
  }

  render() {
    console.log(ConstObj.buttonTextStyle);
    return (<View style={styles.container}>
      <View style={{flex:1}}>
        {this.state.paramViews}
      </View>
      <Button
        textStyle={ConstObj.buttonTextStyle}
        onPress={this.addParamPressed.bind(this)}
        style={ConstObj.buttonStyle}>
        Add Parameter
      </Button>
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
        endpoint = endpoints.endpoints.find(e => e.selected);
        endpoint = 'http://' + endpoint.value.host + ':' + String(endpoint.value.port);
        trainEndpoint = endpoint + '/train';
        // console.log(trainEndpoint);
        fetch(trainEndpoint, {
          method: 'POST',
          body: JSON.stringify(this.state.params.filter(e => e.key !== '' && e.value !== '')), 
          headers: { 'Content-type': 'application/json' }
        });
        console.log('Train Request Sent');
      })
      .catch(err => console.log('Could not obtain endpoints from storage. ' + err));
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 8,
  },
  textInputStyle: {
    height: 40,
    width: '45%'
  }
}

export default TrainScreen;
