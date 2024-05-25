package com.App.Project.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.App.Project.Model.Airports;


@Repository
public interface AirportRepository extends JpaRepository<Airports,Integer> {
	
	@Query(value = "Select * from airports where code=:code ", nativeQuery = true)
	Airports getWaypointDetailsByCode(String code);
}