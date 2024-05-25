package com.App.Project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.App.Project.Model.Waypoints;

@Repository
public interface WaypointsRepository extends JpaRepository<Waypoints, Integer> {

	@Query(value = "Select * from waypoints where airport_id=:id ", nativeQuery = true)
	List<Waypoints> getListOfWaypointsByAirportId(Integer id);
	
}