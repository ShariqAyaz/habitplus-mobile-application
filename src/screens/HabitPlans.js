import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const HabitPlans = () => {
  // Initialize a state variable to track the number of items
  const [itemCount, setItemCount] = useState(0);

  // Function to handle adding an item
  const addItem = () => {
    setItemCount(itemCount + 1);
  };

  // Function to handle removing an item
  const removeItem = () => {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Habit Plans</Text>

      {/* Buttons for adding and removing items */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <Text style={styles.itemCountText}>{itemCount}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={removeItem}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <Calendar
        style={styles.calendar}
        current={'2024-01-01'} // Set the current date to show the month
        markedDates={{
          '2024-01-05': { selected: true }, // Example: Mark a specific date as selected
        }}
        theme={{
          calendarBackground: 'white', // Set the background color of the calendar
          textSectionTitleColor: 'black', // Set the text color of month titles
          dayTextColor: 'black', // Set the text color of month days
          todayTextColor: 'red', // Set the text color of today's date
          selectedDayTextColor: 'white', // Set the text color of selected dates
          selectedDayBackgroundColor: '#007BFF', // Set the background color of selected dates
          textDisabledColor: 'gray', // Set the text color of disabled dates
        }}
        hideExtraDays // Hide days of the previous and next month
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
    color: 'black', // Set the font color to black
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
    borderWidth: 1, // Add a border around the calendar
    borderColor: 'gray', // Set the border color
    borderRadius: 10, // Add border radius for rounded edges
  },
});

export default HabitPlans;
