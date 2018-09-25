import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Strings from '../constants/Strings';
import { FileSystem } from 'expo';

class Folder extends React.Component {

  openFolder() {
    this.DIR = Strings.imageBaseDir + this.props.folderName + '/';
    console.log(this.DIR);
    FileSystem.readDirectoryAsync(this.DIR)
      .then(arr => {
        arr = arr.map(item => this.DIR + item);
        console.log('ImagesUris(openFolder): ' + arr);
        this.props.navigation.navigate('FolderView', {
          imageUris: arr,
          folderName: this.props.folderName,
          onDelete: this.props.onDeleteFolder
        });
      })
      .catch(err => console.log('Couldn\'t read directory\n' + err));
  }

  render() {
    return (<View style={styles.container}>
      <TouchableOpacity style={styles.folder} onPress={this.openFolder.bind(this)}>
        <Text style={styles.textStyle}>
          {this.props.folderName}
        </Text>
      </TouchableOpacity>
    </View>);
  }
}

styles = {
  container: {
    width: '100%',
    height: 50
  },
  folder: {
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textStyle: {

  }
}

export default Folder;
