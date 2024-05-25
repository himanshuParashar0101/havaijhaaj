package com.App.Project.Service;

import com.App.Project.Dtos.WaypointOutput;

public interface OptimumRouteService {
	public WaypointOutput calculateOptimumRoute(String sourceCode, String destinationCode) throws Exception;
	

	public WaypointOutput calculateWeatherOptimumRoute(String sourceCode, String destinationCode) throws Exception;

}