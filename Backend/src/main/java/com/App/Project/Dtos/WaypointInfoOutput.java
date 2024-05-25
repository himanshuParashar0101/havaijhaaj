package com.App.Project.Dtos;

public class WaypointInfoOutput {

	private String wayPointName;
	private double lat;
	private double lon;
	private boolean flag;
	
	public String getWayPointName() {
		return wayPointName;
	}
	public void setWayPointName(String wayPointName) {
		this.wayPointName = wayPointName;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}
	public boolean isFlag() {
		return flag;
	}
	public void setFlag(boolean flag) {
		this.flag = flag;
	}

	

}
