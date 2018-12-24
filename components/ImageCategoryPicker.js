import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Picker,
  Modal,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Button from 'apsl-react-native-button';
import { WebBrowser, ImagePicker, Permissions } from 'expo';
import TextInputModal from '../components/TextInputModal';
import ConstObj from '../constants/Objects';

class ImageCategoryPicker extends React.Component {

  constructor() {
    super();
    this.CATEGORY_LIST = 'category_list';
    this.state = {
      imageUri: '',
      category: '',
      categories: [''],
      textInputModalVisible: false
    };
  }

  componentDidMount() {
    if(this.state.categories.length === 1)
      AsyncStorage.getItem(this.CATEGORY_LIST)
        .then((list) => {
          console.log('Retrieved list: '+ list);
          if(list === null) {
            this.setState({
              ...this.state,
              category: 'Uncategorized' ,
              categories: ['Create new category', 'Uncategorized']
            });
            AsyncStorage.setItem(this.CATEGORY_LIST, JSON.stringify(this.state.categories))
              .then(() => console.log('Successfully saved list'))
              .catch((err) => console.log('Error while saving the list : ' + err));
          }else{
            this.setState({...this.state, category: 'Uncategorized', categories: JSON.parse(list)});
          }
        });
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInputModal
        visible={this.state.textInputModalVisible}
        message={'Enter the new category'}
        onSubmit={(text) => {
          console.log('Text is : ' + text);
          const categories = this.state.categories.concat(text)
          AsyncStorage.setItem(this.CATEGORY_LIST, JSON.stringify(categories))
            .then(() => console.log('Successfully saved list'))
            .catch((err) => console.log('Error while saving the list : ' + err));
          this.setState({...this.state, textInputModalVisible: false, categories, category: text });
        }}
        onRequestClose={() => this.setState({...this.state, textInputModalVisible: false})}
      />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
         <KeyboardAvoidingView
            behavior='padding'
         >
          <View
            style={styles.pickFromDeviceButtonStyle}>
            <Button
              textStyle={ConstObj.buttonTextStyle}
              style={ConstObj.buttonStyle}
              onPress={this.handleImagePick}
            >
              Pick from Device
            </Button>
          </View>
          <View
            style={styles.pickFromCameraButtonStyle}>
            <Button
              textStyle={ConstObj.buttonTextStyle}
              style={ConstObj.buttonStyle}
              onPress={this.handleCameraPick}
            >
              Pick using Camera
            </Button>
          </View>
          <Image
            source={this.state.imageUri.trim() === '' ? require('../assets/images/placeholder-image.jpg') : { uri: this.state.imageUri }}
            style={styles.previewImage}
          />

          {this.renderPicker()}

          <View
            style={styles.submitButtonStyle}>
            <Button
              textStyle={ConstObj.buttonTextStyle}
              style={ConstObj.buttonStyle}
              onPress={this.submitPressed.bind(this)}
            >
              Submit
            </Button>
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

  renderPicker() {
      if(this.props.showCategory === true) {
        return (<View style={{ flexDirection: 'row',  height: 50, alignItems : 'center' }} >
          <Text style={styles.categoryTextStyle}>
            Category
          </Text>
          <Picker
            selectedValue={this.state.category}
            style={{ width: '50%' }}
            onValueChange={(itemValue, itemIndex) => {
              if(itemValue === 'Create new category') {
                this.setState({...this.state, textInputModalVisible: true});
              } else {
                console.log(itemValue + ', ' + itemIndex);
                this.setState({...this.state, category: itemValue});
              }
            }}
          >
            {this.state.categories.map((name) => <Picker.Item label={name} value={name} key={name} />)}
          </Picker>
        </View>);
      } else {
        return <View />;
      }
  }

  addParamPressed() {
    const paramList = this.state.params.concat({key:'', value:''});
    this.setState({...this.state, params: paramList});
  }

  submitPressed() {
    console.log('Submit Pressed');
    if(this.props.showCategory === true)
      this.props.onSubmitPressed(this.state.imageUri, this.state.category);
    else
      this.props.onSubmitPressed(this.state.imageUri)
  }

  createParamView(param, idx) {
    console.log('param view creation');
    console.log(param);
    console.log("index is : " + idx);
    console.log(this.state);
    return (<View style={{ flexDirection: 'row' }} key={idx}>
      <TextInput
        style={{height: 40, width: '45%'}}
        onChangeText={(text) => {this.state.params[idx].key = text; this.setState(this.state);}}
        placeholder="Key"
        value={this.state.params[idx].key}
      />
      <TextInput
        style={{height: 40, width: '45%'}}
        onChangeText={(text) => {this.state.params[idx].value = text; console.log(this.state); this.setState(this.state);}}
        placeholder="Value"
        editable={true}
        value={this.state.params[idx].value}
      />
    </View>);
  }

  handleImagePick = () => {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) => {
        imagePickOptions = {
          mediaTypes: 'Images',
          allowsEditing: true,
          quality: 1
        };
        let result = ImagePicker.launchImageLibraryAsync(imagePickOptions)
          .then((result) => {
            this.handleImageResult(result);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  handleImageResult(result) {
    if (result.cancelled)
      console.log('cancelled')
    else {
      console.log(result);
      this.setState({ ...this.state, imageUri: result.uri });
    }
  }

  handleCameraPick = () => {
    Permissions.askAsync(Permissions.CAMERA)
      .then(({ status }) => {
        if(status === 'granted') {
          Permissions.askAsync(Permissions.CAMERA_ROLL)
            .then(({ status }) => {
              if(status === 'granted') {
                cameraPickOptions = {
                  allowsEditing: true,
                  quality: 1
                };
                let result = ImagePicker.launchCameraAsync(cameraPickOptions)
                  .then((result) => {
                    this.handleImageResult(result);
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  previewImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain'
  },
  categoryTextStyle: {
    width: '50%',
    paddingLeft: 14,
    fontSize: 16
  },
  contentContainer: {
    paddingTop: 4
  },
  pickFromDeviceButtonStyle: {

  },
  pickFromCameraButtonStyle: {
    marginTop: 6
  },
  addParamButtonStyle: {
    marginTop: 6
  },
  submitButtonStyle: {
    marginTop: 6
  },
});

export default ImageCategoryPicker;
