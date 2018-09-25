import React from 'react';
import {
  Image,
  View
} from 'react-native';
import Button from 'apsl-react-native-button';
import { FileSystem } from 'expo';

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

    return (<View style={styles.container}>
      <Image
        source={{ uri: imageUri}}
        style={styles.imageStyle}
        resizeMode='contain'
      />
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
