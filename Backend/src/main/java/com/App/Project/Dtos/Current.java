package com.App.Project.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Current {
	private String time;
	@JsonProperty("temperature_2m")
	private double temperature;
	@JsonProperty("relative_humidity_2m")
	private int relativeHumidity;
	private int isDay;
	private double precipitation;
	private double rain;
	private double snowfall;
	@JsonProperty("weather_code")
	private int weatherCode;
	@JsonProperty("cloud_cover")
	private int cloudCover;
	@JsonProperty("wind_speed_10m")
	private double windSpeed;
	@JsonProperty("wind_direction_10m")
	private int windDirection;

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public double getTemperature() {
		return temperature;
	}

	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}

	public int getRelativeHumidity() {
		return relativeHumidity;
	}

	public void setRelativeHumidity(int relativeHumidity) {
		this.relativeHumidity = relativeHumidity;
	}

	public int getIsDay() {
		return isDay;
	}

	public void setIsDay(int isDay) {
		this.isDay = isDay;
	}

	public double getPrecipitation() {
		return precipitation;
	}

	public void setPrecipitation(double precipitation) {
		this.precipitation = precipitation;
	}

	public double getRain() {
		return rain;
	}

	public void setRain(double rain) {
		this.rain = rain;
	}

	public double getSnowfall() {
		return snowfall;
	}

	public void setSnowfall(double snowfall) {
		this.snowfall = snowfall;
	}

	public int getWeatherCode() {
		return weatherCode;
	}

	public void setWeatherCode(int weatherCode) {
		this.weatherCode = weatherCode;
	}

	public int getCloudCover() {
		return cloudCover;
	}

	public void setCloudCover(int cloudCover) {
		this.cloudCover = cloudCover;
	}

	public double getWindSpeed() {
		return windSpeed;
	}

	public void setWindSpeed(double windSpeed) {
		this.windSpeed = windSpeed;
	}

	public int getWindDirection() {
		return windDirection;
	}

	public void setWindDirection(int windDirection) {
		this.windDirection = windDirection;
	}

	// Getters and setters

}
