import React from 'react';
import {
  Text,
  ScrollView,
  View
} from 'react-native';
import Folder from './Folder';

class FolderList extends React.Component {
  render() {
    return (<ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {this.props.folders.map(folder => {
          console.log(folder);
          return <View
                  style={styles.folderContainer}
                  key={folder}
                >
                  <Folder
                    folderName={folder}
                    navigation={this.props.navigation}
                    onDeleteFolder={this.props.onDeleteFolder}
                  />
                </View>;
        })}
      </View>
    </ScrollView>);
  }
}

const styles = {
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1
  },
  folder: {

  },
  textStyle: {

  },
  folderContainer: {
    paddingTop: 4,
    paddingBottom: 4
  }
}

export default FolderList;
