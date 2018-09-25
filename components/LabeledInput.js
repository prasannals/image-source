import React from 'react';
import {
  TextInput,
  Text,
  View
} from 'react-native';

class LabeledInput extends React.Component {
  render() {
    return (<View style={styles.containerStyle}>
      <View style={styles.labelContainerStyle}>
        <Text style={styles.labelStyle}>{this.props.label}</Text>
      </View>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
        editable={true}
      />
    </View>);
  }
}

const styles = {
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelContainerStyle: {
    justifyContent: 'center',
    height: 40,
    width: '35%'
  },
  labelStyle: {
  },
  textInputStyle: {
    height: 40,
    width: '65%'
  }
};

export default LabeledInput;
