// HabContainer.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const importComponent = (componentType, props) => {
  switch (componentType) {
    case 'Button':
      const Button = require('react-native').Button;
      return <Button {...props} />;
    default:
      return <Text>Component not found</Text>;
  }
};

const HabContainer = ({ children, style }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {

    const loadedComponents = subAppConfig.components.map(comp => {
      
      return importComponent(comp.type, comp.props);
    });

    setComponents(loadedComponents);
  }, [subAppConfig]);

 const containerStyle = StyleSheet.create({
    container: {
      
      ...subAppConfig.styles,
    },
  });

  return <View style={containerStyle.container}>{components}</View>;

};

export default HabContainer;
