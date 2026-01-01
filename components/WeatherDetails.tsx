import { View, Text, StyleSheet } from "react-native";
import { WEATHER_CODES, WEATHER_DESCRIPTIONS } from "../utils/constants";
import { WeatherData } from "../utils/types";
import { CityName } from "../utils/constants";

interface Props {
  data: WeatherData;
  city: CityName;
}

export default function WeatherDetails({ data, city }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cityTitle}>Weather in {city}</Text>
      
      <Text style={styles.icon}>
        {WEATHER_CODES[data.weathercode] || "❓"}
      </Text>
      
      <Text style={styles.description}>
        {WEATHER_DESCRIPTIONS[data.weathercode] || "Unknown"}
      </Text>
      
      <Text style={styles.temp}>Temperature: {Math.round(data.temperature)}°C</Text>
      
      <Text style={styles.detail}>Wind: {data.windspeed} km/h</Text>
      
      <Text style={styles.detail}>Sunrise: {data.sunrise.replace('T', ' ')}</Text>
      
      <Text style={styles.detail}>Sunset: {data.sunset.replace('T', ' ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  cityTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  icon: { 
    fontSize: 80, 
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  temp: { 
    fontSize: 16, 
    textAlign: "center",
    color: "#555",
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555",
    textAlign: "center",
  },
});