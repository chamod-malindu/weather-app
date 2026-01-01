import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CITIES, CityName } from "../utils/constants";

interface Props {
  city: CityName;
  onChange: (value: CityName) => void;
}

export default function CityPicker({ city, onChange }: Props) {
  const cityNames = Object.keys(CITIES) as CityName[];

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={city} 
          onValueChange={onChange}
          style={styles.picker}
        >
          {cityNames.map((cityName) => (
            <Picker.Item 
              key={cityName} 
              label={cityName} 
              value={cityName} 
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginVertical: 10,
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  picker: {
    height: 56,
  },
});