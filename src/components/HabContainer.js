import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, TouchableOpacity, Text, Dimensions, Button, FlatList, CalendarText, TextInput, StyleSheet } from 'react-native';
import { styles } from './styles/HabContainerStyles';

const { height } = Dimensions.get('window');

const ContextMenu = ({ isVisible, onClose, title }) => (
  <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <Text style={styles.title}>
        {title}
        {title}
      </Text>
      <View style={styles.contentContainer}>
        <View style={styles.menuItem}>
          <Text>Option 1</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.menuItem}>
          <Text>Option 2</Text>
        </View>
        <View style={styles.separator} />
      
      </View>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
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
      const { text, credit, textStyle = {}, creditStyle = {} } = props;

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


      const itemText = {
        color: 'white',
        fontSize: 16,
      };

      const renderItem = ({ item }) => (
        <View style={[styles.itemContainer]}>
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
            <View style={[styles.itemContainer]}>
              {/* Clone the element to inject additional styles if necessary */}
              {React.cloneElement(element, {
                style: [element.props.style, itemText] // Merge existing styles with itemText, if applicable
              })}
            </View>
          );
        } else {
          // Your default renderItem logic
          return (
            <View style={[styles.itemContainer]}>
              <Text style={[itemText]}>{item.text}</Text>
            </View>
          );
        }
      };


      return (
        <FlatList
          {...props}
          renderItem={renderMergedItem} // Merges custom styles with potential custom renderItem from props
          style={[styles.flatlistStyle]}
          scrollEnabled={false}
        />
      );


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


const HabContainer = ({ subAppConfig }) => {
  const [components, setComponents] = useState([]);
  const [isMenuVisible, setMenuVisible] = useState(false);


  const menuToggleRef = useRef(null);

  const renderModalContent = () => {
    return (
      <>
        {/* Ensure the title is rendered within a Text component */}
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>
          {subAppConfig.title}
        </Text>
        {/* Description */}
        {subAppConfig.description && (
          <Text style={{ color: 'white', fontSize: 16, marginBottom: 5 }}>
            {subAppConfig.description}
          </Text>
        )}
        {/* Components */}
        {subAppConfig.components.map((comp, index) => {
          // Ensure the dynamic rendering of components correctly handles text
          return (
            <View key={`comp-${index}`} style={{ marginVertical: 4 }}>
              {/* This function needs to ensure text is wrapped in <Text> */}
              {importComponent(comp.type, comp.props)}
            </View>
          );
        })}
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
        style={{ ...iconStyle, zIndex: 20 }} // Ensure icon is clickable
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
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', flex: 1 }}>
          {renderModalContent()}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setMenuVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default HabContainer;
