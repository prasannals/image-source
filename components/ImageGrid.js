import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import { FileSystem } from 'expo';
import ImageTile from './ImageTile';

const { width } = Dimensions.get('window');

export default class ImageBrowser extends React.Component {

  getItemLayout = (data,index) => {
    let length = width/4;
    return { length, offset: length * index, index }
  }

  state = {
    imageUris: []
  }

  onDelete(uri) {
    console.log('onDelete called');
    console.log(this.state.imageUris);
    imageUris = this.state.imageUris.filter(item => item !== uri);
    console.log(imageUris);
    this.setState({imageUris});
  }

  renderImageTile = ({item, index}) => {
    return(
      <ImageTile
        item={item}
        index={index}
        selectImage={() => {
          this.props.navigation.navigate('ImageScreen', { imageUri: item, onDelete: this.onDelete.bind(this), category: this.props.category });
        }}
      />
    )
  }

  renderImages() {
    return(
      <FlatList
        data={this.state.imageUris}
        numColumns={4}
        renderItem={this.renderImageTile.bind(this)}
        keyExtractor={(_,index) => index}
        getItemLayout={this.getItemLayout}
      />
    )
  }

  componentDidMount() {
    this.setState({imageUris: this.props.imageUris});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
