import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import CityPicker from "../components/CityPicker";
import WeatherDetails from "../components/WeatherDetails";
import { CITIES, CityName } from "../utils/constants";
import { WeatherData } from "../utils/types";

export default function WeatherApp() {
  const [city, setCity] = useState<CityName>("Colombo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const { lat, lon } = CITIES[city];
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=sunrise,sunset&timezone=Asia%2FColombo&start_date=${today}&end_date=${today}`;
      
      const { data } = await axios.get(url);

      setWeather({
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weathercode: data.current_weather.weathercode,
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0],
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sri Lanka Weather App</Text>
      
      <CityPicker city={city} onChange={setCity} />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      )}
      
      {weather && !loading && <WeatherDetails data={weather} city={city} />}
      
      <Text style={styles.footer}>Powered by Open-Meteo API</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: "#E8F4F8",
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    color: "#2C5F7F",
  },
  loadingContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: 30,
    marginBottom: 20,
  },
});