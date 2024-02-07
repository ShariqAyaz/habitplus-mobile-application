import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, TouchableOpacity, Text, Dimensions, Button, CalendarText, TextInput, StyleSheet } from 'react-native';
import { styles } from './styles/HabContainerStyles';
import { database } from '../../services/database/index';
const { height } = Dimensions.get('window');
import { Q } from '@nozbe/watermelondb';
import { json } from '@nozbe/watermelondb/decorators';


const renderGridType = (columns, components) => {
  const header = (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      {columns.map((column, index) => (
        <Text key={`header-${index}`} style={{ fontWeight: 'bold' }}>
          {column.name}
        </Text>
      ))}
    </View>
  );

  return (
    <View>
      {header}
    </View>
  );
};


const importComponent = (componentType, props) => {
  switch (componentType) {

    case 'Button':
      const TouchableOpacity = require('react-native').TouchableOpacity;
      const TextX = require('react-native').Text;
      return (
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={props.onPress}>
            <TextX style={styles.greenButtonText}>
              {props.title}
            </TextX>
          </TouchableOpacity>
        </View>
      );
    case 'Calendar':
      <View>
      </View>
    case 'Text':
      const Text = require('react-native').Text;
      const { id, text, credit, textStyle = {}, creditStyle = {} } = props;

      return (
        <View style={[styles.HabContainerStyle]}>
          <Text style={[styles.TitleStyle, styles.textStyle]}>
            {text}
          </Text>
          {credit && (
            <Text style={[styles.CreditStyle]}>
              {credit}
            </Text>
          )}
        </View>
      );

    case 'FlatList':


      return (<View><Text>Text</Text></View>);


    case 'TextInput':

      return (
        <TextInput
          style={[styles.TextInputStyle]}
          {...props}
        />
      );
    case 'gridtype':
      // Custom rendering logic for gridtype
      return renderGridType(readingApp.columns, readingApp.components);

    default:
      return <Text>Component not found</Text>;
  }
};


const HabContainer = ({ subAppConfig,onDelete }) => {
  const [components, setComponents] = useState([]);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuToggleRef = useRef(null);

  async function deleteApp(title) {
    const appsCollection = database.collections.get('apps');
    const appsToDelete = await appsCollection.query(Q.where('title', title)).fetch();

    await database.write(async () => {
      await Promise.all(appsToDelete.map(app => app.destroyPermanently()));
    });

    onDelete(title);
    // Close the menu
    setMenuVisible(false);

  }

  const renderModalContent = () => {
    return (
      <>
        <View style={{ margin: 0, padding: 0 }}>
          <Text style={{ textAlign: 'center', marginTop: 8, paddingTop: 6, fontFamily: 'Roboto-Black', color: 'white', fontSize: 24 }}>
            {subAppConfig.title} SETTINGS
          </Text>
          {subAppConfig.components.map((comp, index) => (
            <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Black', color: '#ECB22E', fontSize: 18 }} key={`${comp.type}-${index}`}>
              {comp.props.credit}
            </Text>
          ))}
          <Text style={{ padding: 5, marginTop: -18, marginBottom: 10, color: 'white', fontSize: 16, textAlign: 'justify', paddingLeft: 18, paddingRight: 18 }}>
            {subAppConfig.description}
          </Text>
          <View style={[styles.separator]} />
          <Text style={{ alignSelf: 'center', textAlign: 'center', marginTop: 10, marginBottom: 0, fontFamily: 'Roboto-Black', color: '#ECB22E', fontSize: 18 }}>
            Theme Color
          </Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 12 }}>
            <TouchableOpacity style={[styles.circle, { backgroundColor: '#5865F2' }]} />
            <TouchableOpacity style={[styles.circle, { backgroundColor: '#ECB22E' }]} />
            <TouchableOpacity style={[styles.circle, { backgroundColor: '#2EB67D' }]} />
            <TouchableOpacity style={[styles.circle, { backgroundColor: '#36C5F0' }]} />
            <TouchableOpacity style={[styles.circle, { backgroundColor: '#E01E5A' }]} />
          </View>
          <View style={[styles.separator]} />
        </View>

        {/* Components */}
        {/* {subAppConfig.components.map((comp, index) => { */}
        {/* return ( */}
        {/* <View key={`comp-${index}`} style={{ marginVertical: 4 }}> */}
        {/* This function needs to ensure text is wrapped in <Text> */}
        {/* {importComponent(comp.type, comp.props)} */}
        {/* </View> */}
        {/* ); */}
        {/* })} */}

      </>
    );
  };

  useEffect(() => {
    const loadedComponents = subAppConfig.components.map((comp, index) => {
      // Generate a unique key for each component
      const key = `${comp.type}-${index}`;
      return (
        <View key={key}>
          {importComponent(comp.type, comp.props)}
        </View>
      );
    });
    

    setComponents(loadedComponents);
  }, [subAppConfig]);

  const iconStyle = {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10, // Make it easier to touch
    zIndex: 10, // Ensure it's above other content
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...iconStyle, zIndex: 20 }}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}> . . . </Text>
      </TouchableOpacity>

      {subAppConfig.components.map((comp, index) => (
        <View key={`${comp.type}-${index}`}>
          {importComponent(comp.type, comp.props)}
        </View>
      ))}

      <Modal
        visible={isMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        
        <View style={{ backgroundColor: '#333333', flex: 1, opacity: 0.99 }}>
          {renderModalContent()}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteApp(subAppConfig.title)}>
            <Text style={styles.closeButtonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity

            style={styles.closeButton}
            onPress={() => setMenuVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>
    </View>
  );
};

export default HabContainer;
