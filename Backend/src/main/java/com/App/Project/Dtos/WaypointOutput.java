package com.App.Project.Dtos;

import java.util.List;

public class WaypointOutput {

	private List<WaypointInfoOutput> waypoints;
	private double shortestHaversineAlgorithmDistance;
	private double shortestWaypointDistance;
	private String unit;
	
	public List<WaypointInfoOutput> getWaypoint() {
		return waypoints;
	}
	public void setWaypoint(List<WaypointInfoOutput> waypoint) {
		this.waypoints = waypoint;
	}
	public double getShortestHaversineAlgorithmDistance() {
		return shortestHaversineAlgorithmDistance;
	}
	public void setShortestHaversineAlgorithmDistance(double shortestHaversineAlgorithmDistance) {
		this.shortestHaversineAlgorithmDistance = shortestHaversineAlgorithmDistance;
	}
	public double getShortestWaypointDistance() {
		return shortestWaypointDistance;
	}
	public void setShortestWaypointDistance(double shortestWaypointDistance) {
		this.shortestWaypointDistance = shortestWaypointDistance;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}

	

}
