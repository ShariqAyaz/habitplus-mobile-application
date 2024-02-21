import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';

const goals = [
  "Freedom Exploration",
  "Mindful Solitude",
  "Physical Transformation",
  "Community Connection",
  "Personal Achievement",
  "Stress Relief",
  "Adventure Seeking",
  "Zen Attainment",
  "Stamina Building",
  "Nature Bonding",
  "Inspirational Journey",
];

const GoalsSelection = () => {
  const [checkedGoals, setCheckedGoals] = useState([]);

  const handleCheck = (goal) => {
    if (checkedGoals.includes(goal)) {
      setCheckedGoals(checkedGoals.filter(item => item !== goal));
    } else {
      setCheckedGoals([...checkedGoals, goal]);
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        {goals.map((goal, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Checkbox
              status={checkedGoals.includes(goal) ? 'checked' : 'unchecked'}
              onPress={() => handleCheck(goal)}
            />
            <Text style={{ marginLeft: 8 }}>{goal}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default GoalsSelection;
