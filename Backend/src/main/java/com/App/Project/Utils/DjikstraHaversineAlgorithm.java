package com.App.Project.Utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.App.Project.Dtos.WaypointOutput;
import com.App.Project.Dtos.WaypointInfoOutput;
import com.App.Project.Model.Airports;
import com.App.Project.Model.Waypoints;

class WaypointDistance {
	Waypoints waypoint;
	double distance;

	public WaypointDistance(Waypoints waypoint, double distance) {
		this.waypoint = waypoint;
		this.distance = distance;
	}
}

@Service
public class DjikstraHaversineAlgorithm {
	static List<String> activePoints = new ArrayList<>();

	// Function to calculate the Haversine distance between two points
	public static double haversineDistance(Waypoints point1, Waypoints point2) {
		double R = 6371; // Radius of the Earth in kilometers
		double dLat = Math.toRadians(point2.getLatitude() - point1.getLatitude());
		double dLon = Math.toRadians(point2.getLongitude() - point1.getLongitude());
		double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(point1.getLatitude()))
				* Math.cos(Math.toRadians(point2.getLatitude())) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c; // Distance in kilometers
	}

	// Dijkstra's Algorithm
	public static double dijkstra(Waypoints source, Waypoints destination, Map<Waypoints, List<Waypoints>> graph) {
		// Priority queue for vertices
		PriorityQueue<WaypointDistance> pq = new PriorityQueue<>(Comparator.comparingDouble(wd -> wd.distance));
		// Map to store distances
		Map<Waypoints, Double> distances = new HashMap<>();
		// Map to store the previous waypoint for each waypoint
		Map<Waypoints, Waypoints> previous = new HashMap<>();
		// Set to keep track of visited waypoints
		Set<Waypoints> visited = new HashSet<>();

		// Initialize distances with infinity and add waypoints to the map
		for (Waypoints waypoint : graph.keySet()) {
			distances.put(waypoint, Double.POSITIVE_INFINITY);
		}

		// Set distance of source to 0 and add to the priority queue
		distances.put(source, 0.0);
		pq.offer(new WaypointDistance(source, 0.0));

		while (!pq.isEmpty()) {
			WaypointDistance current = pq.poll();
			Waypoints currentWaypoint = current.waypoint;

			// Break if destination is reached
			if (currentWaypoint.equals(destination)) {
				printPath(previous, destination);
				return distances.get(destination);
			}

			// Skip processing if already visited
			if (!visited.add(currentWaypoint)) {
				continue;
			}

			// Calculate distances to neighbors
			for (Waypoints neighbor : graph.get(currentWaypoint)) {
				if (!visited.contains(neighbor)) {
					double distanceToNeighbor = haversineDistance(currentWaypoint, neighbor);
					double newDistance = distances.get(currentWaypoint) + distanceToNeighbor;
					if (newDistance < distances.get(neighbor)) {
						distances.put(neighbor, newDistance);
						pq.offer(new WaypointDistance(neighbor, newDistance));
						previous.put(neighbor, currentWaypoint);
					}
				}
			}
		}

		// If destination is not reachable
		System.out.println("Destination is not reachable.");
		return Double.POSITIVE_INFINITY;
	}

	// Function to print the path from source to destination
	public static void printPath(Map<Waypoints, Waypoints> previous, Waypoints destination) {
		List<Waypoints> path = new ArrayList<>();
		for (Waypoints at = destination; at != null; at = previous.get(at)) {
			path.add(at);
		}
		Collections.reverse(path);
		System.out.println("Path: ");
		for (Waypoints wp : path) {
			activePoints.add(wp.getWaypointName());
			System.out.println(wp.getWaypointName());
		}
	}

	private static List<Waypoints> feedWaypoints(Waypoints source, Waypoints destination, Waypoints currentWaypoint,
			List<Waypoints> listWaypoints) {

		listWaypoints = listWaypoints.stream().filter(x -> x.getId() != currentWaypoint.getId())
				.collect(Collectors.toList());

		if ((currentWaypoint.getAirport().getName()).equalsIgnoreCase(source.getWaypointName()))
			listWaypoints.add(source);

		if ((currentWaypoint.getAirport().getName()).equalsIgnoreCase(destination.getWaypointName()))
			listWaypoints.add(destination);

		return listWaypoints;
	}

	private static List<WaypointInfoOutput> setOutputWaypoints(Waypoints source, Waypoints destination,
			List<Waypoints> combineList) {
		combineList.add(source);
		combineList.add(destination);
		List<WaypointInfoOutput> listInfo = new ArrayList<>();

		for (Waypoints waypoints : combineList) {

			WaypointInfoOutput waypointInfoOutput = new WaypointInfoOutput();
			waypointInfoOutput.setWayPointName(waypoints.getWaypointName());
			waypointInfoOutput.setLat(waypoints.getLatitude());
			waypointInfoOutput.setLon(waypoints.getLongitude());
			if (activePoints.contains(waypointInfoOutput.getWayPointName()))
				waypointInfoOutput.setFlag(true);
			else
				waypointInfoOutput.setFlag(false);

			listInfo.add(waypointInfoOutput);
		}

		return listInfo;
	}

	// Execute
	public WaypointOutput execute(Airports sourceAir, Airports destinationAir, List<Waypoints> sourceWaypoints,
			List<Waypoints> destWaypoints) throws Exception {
		try {
			WaypointOutput output = new WaypointOutput();

			Waypoints source = new Waypoints();
			Waypoints destination = new Waypoints();
			source.setLatitude(sourceAir.getLatitude());
			source.setLongitude(sourceAir.getLongitude());
			source.setWaypointName(sourceAir.getName());

			destination.setLatitude(destinationAir.getLatitude());
			destination.setLongitude(destinationAir.getLongitude());
			destination.setWaypointName(destinationAir.getName());

			Map<Waypoints, List<Waypoints>> graph = new HashMap<>();
			graph.put(source, sourceWaypoints);
			graph.put(destination, destWaypoints);
			List<Waypoints> combineList = new ArrayList<>(sourceWaypoints);
			combineList.addAll(destWaypoints);

			for (Waypoints s : combineList) {
				graph.put(s, feedWaypoints(source, destination, s, combineList));
			}

			System.out.println(" short harvesine distance: " + haversineDistance(source, destination));

			double distance = dijkstra(source, destination, graph);

			if (distance != Double.POSITIVE_INFINITY) {
				System.out.println("Shortest Distance: " + distance + " km");
			} else {
				System.out.println("Destination is not reachable.");
			}
			output.setWaypoint(setOutputWaypoints(source, destination, combineList));
			output.setShortestHaversineAlgorithmDistance(haversineDistance(source, destination));
			output.setShortestWaypointDistance(distance);
			output.setUnit("Km");
			return output;
		} catch (Exception e) {
			throw new Exception("Destination is not reachable.");
		}
	}

}