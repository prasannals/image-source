import React from 'react';
import {
  Modal,
  TextInput,
  Text,
  View,
  Button
} from 'react-native';

class TextInputModal extends React.Component {
  state = { text: '' }

  componentWillMount() {

  }

  setText(text) {
    this.setState({...this.state, text})
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {
            this.setState({...this.state, text: ''});
            this.props.onRequestClose();
          }}>
          <View style={styles.modalOuterView}>
            <View style={styles.modalInnerView}>
              <Text>
                {this.props.message}
              </Text>
              <TextInput
                autoFocus={true}
                style={styles.textInputStyle}
                onChangeText={text => this.setText(text) }
                value={this.state.text}
              />

              <View style={styles.buttonContainerStyle}>
                <Button
                  onPress={() => {
                    this.setState({...this.state, text: ''});
                    this.props.onRequestClose();
                  }}
                  title='Cancel'
                />
                <Button
                  onPress={() => {
                      const text = this.state.text;
                      this.setText('');
                      this.props.onSubmit(text);
                  }}
                  title='OK'
                />
              </View>
            </View>
          </View>
        </Modal>

    );
  }
}


const styles = {
  buttonContainerStyle: {
    flexDirection: 'row'
  },
  modalOuterView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  modalInnerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    height: 300,
    width: 400
  },
  textInputStyle: {
    width: '100%',
    height: 50
  }
};

export default TextInputModal;
