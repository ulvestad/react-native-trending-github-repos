import * as WebBrowser from 'expo-web-browser';
import React from 'react';

import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  StatusBar,
  Modal,
  Image
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { AuthSession } from 'expo';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isModalVisible: false,
      detailedObject: {}
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = async () => {
    const data = await fetch('https://github-trending-api.now.sh/repositories?language=&since=daily');
    const items = await data.json();
    this.setState({items: items});
  }; 
  
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onPress = (item) => {
   this.setState({ detailedObject: item }, () => this.toggleModal());
  }

  render(){

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Github Repos</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {this.state.items.map( (item, index) => (
          <ScrollView style={styles.listElement} key={"v"+index}>
            <TouchableOpacity style={{display:"flex", flexDirection:"row"}} onPress={() => this.onPress(item)}>
              <Image 
                  style={{width: 30, height: 30, marginLeft: 0, marginBottom: 15, marginTop:10}}
                  source={{uri:item.avatar}}
                />
              <Text style={styles.elementTitle} key={"t"+index}>
                {item.author + " / " +item.name}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ))}
      </ScrollView>
      <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.isModalVisible}
          style={styles.modalStyle}
        >
          <View style={styles.modalContainer}>  
            <View style={styles.modalContentStyle}>
              <View stye={styles.modalContentWrapper}>
                <Text style={styles.headerModal}>
                  {this.state.detailedObject.author + " / " + this.state.detailedObject.name}
                </Text>
                <Text style={{marginLeft: 10, marginRight: 10, marginTop: 10, fontWeight:"bold"}}>
                  {"Description:"}
                </Text>
                <Text  style={{marginLeft: 10,  marginRight: 10,}}>
                  {this.state.detailedObject.description}
                </Text>
                <Text style={{marginLeft: 10,  marginRight: 10,marginTop: 10, fontWeight:"bold"}}>
                  {"Language: "}
                </Text>
                <Text  style={{marginLeft: 10, marginRight: 10,}}>
                  {this.state.detailedObject.language}
                </Text>
                <Image 
                  style={{width: 50, height: 50, marginLeft: 10, marginBottom: 20, marginTop:10}}
                  source={{uri:this.state.detailedObject.avatar}}
                >
                </Image>
              </View>
              <Button style={{marginTop: 15}} title="Close" onPress={this.toggleModal} />
            </View>
          </View>
        </Modal>
    </View>
  );
}
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    marginTop: 50,
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 20
  },
  headerModal:{
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10
  },
  elementTitle:{
    fontSize: 15,
    fontWeight: "500",
    color: "#515151",
    marginTop: 15,
    marginLeft: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    alignContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContentStyle:{
    width: '90%',
    backgroundColor:"white",
  },
  modalContentWrapper:{
    marginHorizontal: 20,
    marginVertical: 20
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  listElement:{
    marginTop: 0,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
