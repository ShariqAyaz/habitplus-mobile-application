// HabContainer.js
import React, { useState, useEffect, useRef } from 'react';

import { View, Modal, TouchableOpacity, Text, Dimensions, Button, FlatList, CalendarText, TextInput, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

const ButtonStyle = StyleSheet.create({
  buttonStyle: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    padding: 10,
    marginTop: 8,
    color: 'white',
    backgroundColor: '#075E54'
  }
});

const contextMenuStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  menuItem: {
    backgroundColor: '#333333',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 4,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 20, // Adjusted for visual spacing from the title
  },
  separator: {
    height: 1,
    backgroundColor: '#ECB22E',
    width: '90%',
    marginVertical: 4,
  },
  closeButton: {
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F14F21',
    marginBottom: 20, // Adjusted for visual spacing from the bottom
    borderRadius: 30,
  },
  closeButtonText: {
    fontFamily: 'Roboto-Black',
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginTop: 20,
  },
});


const ContextMenu = ({ isVisible, onClose, title }) => (
  <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={contextMenuStyle.modalContainer}>
      <Text style={contextMenuStyle.title}>
        {title}
      </Text>
      {/* <View style={contextMenuStyle.contentContainer}>
        <View style={contextMenuStyle.menuItem}>
          <Text>Option 1</Text>
        </View>
        <View style={contextMenuStyle.separator} />
        <View style={contextMenuStyle.menuItem}>
          <Text>Option 2</Text>
        </View>
        <View style={contextMenuStyle.separator} />
      
      </View> */}
      {/* Close Button */}
      <TouchableOpacity style={contextMenuStyle.closeButton} onPress={onClose}>
        <Text style={contextMenuStyle.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);




const renderGridType = (columns, components) => {
  // Assuming a simple grid where we just render column names for now
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
        <View style={ButtonStyle.buttonStyle}>
          <TouchableOpacity onPress={props.onPress}>
            <TextX style={{ color: 'white', fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>
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
      const TitleStyle = { color: 'white', fontSize: 24, fontWeight: 'bold' };
      const CreditStyle = { marginTop: 0, paddingTop: 0, paddingLeft: 4, color: '#ECB22E', fontSize: 12, fontStyle: 'italic' };
      const HabContainerStyle = { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', padding: 2, marginTop: 8 };
      const { text, credit, textStyle = {}, creditStyle = {} } = props;

      return (
        <View style={[HabContainerStyle]}>
          <Text style={[TitleStyle, textStyle]}>
            {text}
          </Text>
          {credit && (
            <Text style={[CreditStyle, creditStyle]}>
              {credit}
            </Text>
          )}
        </View>
      );

    case 'FlatList':
      const flatlistStyle = {
        alignSelf: 'stretch',
        margin: 10,
      };

      const itemContainer = {
        backgroundColor: '#333',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: '#FFF',
      };

      const itemText = {
        color: 'white',
        fontSize: 16,
      };

      const renderItem = ({ item }) => (
        <View style={[itemContainer]}>
          <Text style={[itemText]}>{item.text}</Text>
        </View>
      );

      const renderMergedItem = ({ item, index, separators }) => {
        // Check if there's a custom renderItem prop
        if (props.renderItem) {
          // Call the custom renderItem function to get the element to render
          const element = props.renderItem({ item, index, separators });

          // Wrap the rendered element in a View with your custom styles
          return (
            <View style={[itemContainer]}>
              {/* Clone the element to inject additional styles if necessary */}
              {React.cloneElement(element, {
                style: [element.props.style, itemText] // Merge existing styles with itemText, if applicable
              })}
            </View>
          );
        } else {
          // Your default renderItem logic
          return (
            <View style={[itemContainer]}>
              <Text style={[itemText]}>{item.text}</Text>
            </View>
          );
        }
      };


      return (
        <FlatList
          {...props}
          renderItem={renderMergedItem} // Merges custom styles with potential custom renderItem from props
          style={[flatlistStyle]}
          scrollEnabled={false}
        />
      );


    case 'TextInput':

      const TextInputStyle =
      {

        borderColor: 'white',
        borderWidth: 0.3,
        margin: 8,
        width: '90%',
        marginBottom: 8,
        borderRadius: 2,
        color: 'white',
        alignSelf: 'center',
        padding: 10,
      }

      return (
        <TextInput
          style={[TextInputStyle]}
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


const HabContainer = ({ subAppConfig }) => {
  const [components, setComponents] = useState([]);
  const [isMenuVisible, setMenuVisible] = useState(false);

<ContextMenu
  isVisible={isMenuVisible}
  onClose={() => setMenuVisible(false)}
  title={subAppConfig.title} // Dynamic title based on subAppConfig or a default
/>


  const menuToggleRef = useRef(null);


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

  const containerStyle = StyleSheet.create({
    container: {
      minHeight: 120,
      padding: 4,
      width: '88%',
      alignSelf: 'center',
      paddingBottom: 16,
      margin: 8,
      marginBottom: 20,
      borderRadius: 22,
      backgroundColor: '#333333',
      flexGrow: 1,
      flexShrink: 1,
      shadowColor: 'black',
      shadowOffset: {
        width: -10,
        height: 10,
      },
      shadowOpacity: 0.54,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  return (
    <View style={containerStyle.container}>
      {/* This TouchableOpacity acts as a touchless button for toggling the context menu */}
      <TouchableOpacity ref={menuToggleRef} style={iconStyle} onPress={() => setMenuVisible(!isMenuVisible)}>
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}> . . . </Text>
      </TouchableOpacity>

      {components}

      <ContextMenu
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
        title={subAppConfig.title || "APP SETTINGS"} // Dynamic title
      />
    </View>
  );
};

export default HabContainer;
