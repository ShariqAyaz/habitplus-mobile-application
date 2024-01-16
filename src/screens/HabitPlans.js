import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const HabitPlans = () => {
  
  const [itemCount, setItemCount] = useState(0);

  
  const addItem = () => {
    setItemCount(itemCount + 1);
  };

  
  const removeItem = () => {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Habit Plans</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <Text style={styles.itemCountText}>{itemCount}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={removeItem}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>

      <Calendar
        style={styles.calendar}
        current={'2024-01-01'} 
        markedDates={{
          '2024-01-05': { selected: true }, 
        }}
        theme={{
          calendarBackground: 'red', 
          textSectionTitleColor: 'red', 
          dayTextColor: 'red', 
          todayTextColor: 'red', 
          selectedDayTextColor: 'white', 
          selectedDayBackgroundColor: '#007BFF', 
          textDisabledColor: 'pink', 
        }}
        hideExtraDays 
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black', 
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCountText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  calendar: {
    flex: 1,
    borderWidth: 1, 
    borderColor: 'gray', 
    borderRadius: 10, 
  },
});

export default HabitPlans;
