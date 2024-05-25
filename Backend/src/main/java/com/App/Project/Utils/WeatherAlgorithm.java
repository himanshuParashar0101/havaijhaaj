package com.App.Project.Utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.App.Project.Dtos.Current;
import com.App.Project.Dtos.WeatherData;
import com.App.Project.Model.Waypoints;

@Service
public class WeatherAlgorithm {

	private static final String API_URL = "https://api.open-meteo.com/v1/forecast";

	public WeatherData fetchWeatherData(double latitude, double longitude) {
		String url = String.format(
				"%s?latitude=%s&longitude=%s&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=visibility&timezone=auto&forecast_days=1",
				API_URL, String.valueOf(latitude), String.valueOf(longitude));

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<WeatherData> response = restTemplate.getForEntity(url, WeatherData.class);

		return response.getBody();
	}

	public List<Waypoints> fatchWeatherOptimumWaypoints(List<Waypoints> waypoints) {

		List<Waypoints> optimumPoints = new ArrayList<>();
		for (Waypoints w : waypoints) {
			boolean flag = true;
			WeatherData weatherData = fetchWeatherData(w.getLatitude(), w.getLongitude());

			// Extracting current weather and visibility
			Current currentWeather = weatherData.getCurrent();
			double visibility = weatherData.getHourly().getVisibility()[0]; // First value from the visibility array

			if (currentWeather.getTemperature() < -15.0 && currentWeather.getTemperature() > 40) {
				flag = false;
			}

			if (currentWeather.getRelativeHumidity() > 60) {
				flag = false;
			}
			if (currentWeather.getRain() > 2) {
				flag = false;
			}

			if (currentWeather.getPrecipitation() < 0 && currentWeather.getPrecipitation() > 2) {
				flag = false;
			}

			if (currentWeather.getSnowfall() > 0) {
				flag = false;
			}

			if (currentWeather.getCloudCover() >= 60) {
				flag = false;
			}

			if (currentWeather.getWindSpeed() > 20) {
				flag = false;
			}
			
			if (currentWeather.getWeatherCode() > 3) {
				flag = false;
			}

			if (flag)
				optimumPoints.add(w);
//
//			System.out.println();
//			System.out.println("Current Weather:" + w.getWaypointName());
//			System.out.println("Temperature: " + currentWeather.getTemperature() + "°C");
//			System.out.println("Rain: " + currentWeather.getRain() + "mm");
//			System.out.println("Cloud Cover" + currentWeather.getCloudCover());
//			System.out.println("Weather Code " + currentWeather.getWeatherCode());
//			System.out.println("Relative Humidity: " + currentWeather.getRelativeHumidity() + "%");
//			System.out.println("Relative Humidity: " + currentWeather.getWindSpeed());
//			System.out.println("Visibility: " + visibility + "m");
//			System.out.println();

		}

		return optimumPoints;

	}
}



