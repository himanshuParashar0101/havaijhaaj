package com.App.Project.Model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "waypoints")
public class Waypoints {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "waypoint_name")
	private String waypointName;

	@Column(name = "latitude")
	private double latitude;
	@Column(name = "longitude")
	private double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airport_id", nullable = false)
	private Airports airport;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getWaypointName() {
		return waypointName;
	}
	public void setWaypointName(String waypointName) {
		this.waypointName = waypointName;
	}
	public Airports getAirport() {
		return airport;
	}
	public void setAirport(Airports airport) {
		this.airport = airport;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Waypoints waypoint = (Waypoints) o;
		return Double.compare(waypoint.latitude, latitude) == 0 && Double.compare(waypoint.longitude, longitude) == 0
				&& Objects.equals(waypointName, waypoint.waypointName);
	}

	@Override
	public int hashCode() {
		return Objects.hash(latitude, longitude, waypointName);
	}

	@Override
	public String toString() {
		return waypointName + " (" + latitude + ", " + longitude + ")";
	}
	

}
