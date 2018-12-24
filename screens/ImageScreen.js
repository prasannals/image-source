import React from 'react';
import {
  Image,
  View,
  AsyncStorage
} from 'react-native';
import Button from 'apsl-react-native-button';
import { FileSystem } from 'expo';
import Strings from '../constants/Strings';
import ConstObj from '../constants/Objects';
import NetworkUtil from '../util/NetworkUtil';

class ImageScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Image',
    headerRight: (
      <Button onPress={() => {
        imageUri = navigation.getParam('imageUri');

        FileSystem.deleteAsync(imageUri)
          .then(() => {
            console.log('Deleted Successfully');
            navigation.getParam('onDelete')(imageUri);
            navigation.goBack();
          })
          .catch(err => console.log('Could not delete file. ' + err))
      }}>
        Delete
      </Button>
    )
  })

  render() {
    imageUri = this.props.navigation.getParam('imageUri');
    category = this.props.navigation.getParam('category');

    return (<View style={{flex:1}}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUri}}
          style={styles.imageStyle}
          resizeMode='contain'
        />
      </View>
      <Button
        textStyle={ConstObj.buttonTextStyle}
        style={ConstObj.buttonStyle}
        onPress={() => NetworkUtil.sendToServer(imageUri, category).then(() => console.log('Image Sent')).catch(err => console.log('Could not send image ' + err))}
      >
      Send image to server
      </Button>
    </View>
  );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: '100%',
    height: 300
  }
}

export default ImageScreen;
