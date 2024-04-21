import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Modal, TouchableOpacity, Text, Dimensions, Button, CalendarText, TextInput, StyleSheet } from 'react-native';
import { styles } from './styles/HabContainerStyles';
import { database } from '../../services/database/index';
const { height } = Dimensions.get('window');
import { Q } from '@nozbe/watermelondb';
import { json } from '@nozbe/watermelondb/decorators';
import { logError } from '@nozbe/watermelondb/utils/common';

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

const HabContainer = ({ onActivityRun, subAppConfig, onDelete, onAppSelected }) => {
  const [components, setComponents] = useState([]);
  const [activityComponents, setActivityComponents] = useState([]); setActivityComponents
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

  // Setting modal is access by 3 dots on each app, on main screen
  const settingsModal = () => {
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

    // The "loadAppComponents" is a list of all components from the MainScreen.js const loadApps = apps.map(app => ({... components: [....
    const loadAppComponents = async () => {
      const loadAppComponents = subAppConfig.components.map((comp, index) => {
        const key = `${comp.type}-${index}`;
        return (
          <View key={key}>
            {importComponent(comp.type, comp.props)}
          </View>
        );
      });

      // Correctly set components state with loaded components
      setComponents(loadAppComponents);

      // Pick a unique App ID ( appid )
      const appid = subAppConfig.appid;
      // console.log(appid);

      // Fetch and log activities - corrected to await the result
      const activities = await database.collections
        .get('app_activity')
        .query(Q.where('appid', appid))
        .fetch();

      //console.log(activities[activities.length-1].day);

      let activityRecords = [];

      // activity line items load here
      if (activities.length > 0) {

        activityRecords = activities.map((activity, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => onActivityRun(activity.activityid)}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.21 }}>
                  <Text style={[styles.ActivityFrequency, { color: '#dbebfa', textAlign: 'justify' }]}>{activity.type}</Text>
                </View>
                <View style={{ flex: 0.60, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.ActivityTitle}>{activity.title}</Text>
                </View>
                <View style={{ flex: 0.38, flexDirection: 'row', justifyContent: 'space-between' }}>
                  {/* <Text style={styles.ActivityFrequencyAt}><Text style={{color:'white', fontWeight:'100'}}>@ </Text>{activity.time} {activity.day}</Text> */}
                  {activity.type === 'DAILY' && (
                    <Text style={styles.ActivityFrequencyAt}>{activity.time}</Text>
                  )}
                  {activity.type === 'WEEKLY' && (
                    <Text style={styles.ActivityFrequencyAt}>{['MONDAY', 'TUESDAY', 'WEEKDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'][activity.day]} {activity.time}</Text>
                  )}
                  {activity.type === 'MONTHLY' && (
                    <Text style={styles.ActivityFrequencyAt}>
                      {new Date(activity.date).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit'
                              })} {activity.time}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        });
      }
      setActivityComponents(activityRecords);
    };

    loadAppComponents();
  }, [subAppConfig]);

  const iconStyle = {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 10,
  };

  return (
    <View style={styles.container}>

      {/* 3 dots to open settings modal */}
      <TouchableOpacity
        style={{ ...iconStyle, zIndex: 20 }}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}> . . . </Text>
      </TouchableOpacity>
      {/* 3 dots to open settings modal END */}

      {/* ***** Each App by Each apps load from apps table, from MainScreen ***** */}
      {/* below Approach temporarily depreciated and might used if need 
          as the alternative is just below */}
      {/*  {subAppConfig.components.map((comp, index) => (
        <View key={`${comp.type}-${index}`}>
          {importComponent(comp.type, comp.props)}
        </View>
      ))}  */}
      {components.map((Component, index) => (
        <View key={index}>
          {Component}
        </View>
      ))}
      {/* ***** Each App by Each apps load from apps table, from MainScreen END ***** */}
      {/* ***** Each Activity within App load from activity table, query exec localy ***** */}
      {activityComponents.map((Component, index) => (
        <View style={styles.ActivityView} key={index}>
          {Component}
        </View>
      ))}
      {/* ***** Each Activity within App load from activity table, query exec localy END ***** */}

      {/* The Button To create a new Activity / Habit Lead to Modal */}
      <Modal
        visible={isMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={{ backgroundColor: '#333333', flex: 1, opacity: 0.99 }}>
          {settingsModal()}
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
      {/* The Button To create a new Activity / Habit Lead to Modal END */}

    </View>
  );
};

export default HabContainer;