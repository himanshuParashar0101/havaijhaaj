package com.App.Project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.App.Project.Dtos.WaypointInput;
import com.App.Project.Dtos.WaypointOutput;
import com.App.Project.Service.OptimumRouteService;


@RestController
@RequestMapping("/airbus6")
@CrossOrigin
public class OptimumRouteController {
    @Autowired
    private OptimumRouteService optimumRouteService;


    @GetMapping(value="/calculateOptimumRoute", produces=MediaType.APPLICATION_JSON_VALUE)
    public WaypointOutput calculateOptimumRoute(@RequestBody WaypointInput input) throws Exception{
        return optimumRouteService.calculateOptimumRoute(input.getSource(),input.getDestination());
    }
    
    @GetMapping(value="/calculateWeatherOptimumRoute", produces=MediaType.APPLICATION_JSON_VALUE)
    public WaypointOutput calculateWeatherOptimumRoute(@RequestBody WaypointInput input) throws Exception{
        return optimumRouteService.calculateWeatherOptimumRoute(input.getSource(),input.getDestination());
    }
}