package com.App.Project.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.App.Project.Dtos.WaypointOutput;
import com.App.Project.Model.Airports;
import com.App.Project.Model.Waypoints;
import com.App.Project.Repository.AirportRepository;
import com.App.Project.Repository.WaypointsRepository;
import com.App.Project.Utils.DjikstraHaversineAlgorithm;
import com.App.Project.Utils.WeatherAlgorithm;

@Service
public class OptimumRouteServiceImpl implements OptimumRouteService {

	@Autowired
	private WaypointsRepository waypointsRepository;

	@Autowired
	private AirportRepository airportRepository;

	@Autowired
	private DjikstraHaversineAlgorithm djikstraHaversineAlgorithm;

	@Autowired
	private WeatherAlgorithm weatherAlgorithm;

	@Override
	public WaypointOutput calculateOptimumRoute(String sourceCode, String destinationCode) throws Exception {

		Airports source = airportRepository.getWaypointDetailsByCode(sourceCode);
		Airports destination = airportRepository.getWaypointDetailsByCode(destinationCode);
		List<Waypoints> sourceWaypoints = waypointsRepository.getListOfWaypointsByAirportId(source.getId());
		List<Waypoints> destinationWaypoints = waypointsRepository.getListOfWaypointsByAirportId(destination.getId());

		WaypointOutput path = djikstraHaversineAlgorithm.execute(source, destination, sourceWaypoints,
				destinationWaypoints);

		return path;

	}

	@Override
	public WaypointOutput calculateWeatherOptimumRoute(String sourceCode, String destinationCode) throws Exception {

		Airports source = airportRepository.getWaypointDetailsByCode(sourceCode);
		Airports destination = airportRepository.getWaypointDetailsByCode(destinationCode);
		List<Waypoints> sourceWaypoints = waypointsRepository.getListOfWaypointsByAirportId(source.getId());
		List<Waypoints> destinationWaypoints = waypointsRepository.getListOfWaypointsByAirportId(destination.getId());
		sourceWaypoints = weatherAlgorithm.fatchWeatherOptimumWaypoints(sourceWaypoints);
		destinationWaypoints = weatherAlgorithm.fatchWeatherOptimumWaypoints(destinationWaypoints);
		WaypointOutput path = djikstraHaversineAlgorithm.execute(source, destination, sourceWaypoints,
				destinationWaypoints);

		return path;

	}
}