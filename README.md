**Enhancing Flight Navigation Mechanism for Optimal Route Planning and Risk Mitigation**

**TEAM - CREATIVE MINDS**

**Members - Himanshu Parashar , Bryan Devadatha, Suyash Tiwari, Alok Kushwaha ,Chirag Lalwani**

**GOAL**

Design, develop, and implement a robust software solution for identifying optimal flight paths.
Provide real-time risk assessment and alternative route suggestions.
Integrate real-time health metrics tracking from flight sensor data.


**Features**


1. Real Time Route Planner based on weather and three different popular algorithms and logic which includes Dijkstra's algorthm, Haversine algorithm and waypoint logic created by us

2. Real time weather data from open meteo api

3. Flight Maintenance Dashbaord with notifcations to track information about flights .

4. Real time data from flight sensor which include fuel consumption, Pressure, ETG readings.

5. Information about flight map curent flight and summary of flights over a month. 

We have created three main dashboards for this problem statement-

1- Optimal Route Finding Based on Weather Factor - Code provide in repo

2- Flight Matrix Dashboard -- Deployed using netflify- link-https://himanshuparashar0101.github.io/flight-matrix/index2.html

3- Flight Sustainability Dashboard -- Deployed using netflify - link - https://aircraftsustainabilityplatform.netlify.app/dashboard


**I- Optimal Route Finding Based on Distance(Fuel optimisation) Weather Factors**

Run Backend Steps:

Run SpringBoot Server --
1. git clone Project folder 
2. Download ecilpse and import as existing maven project
3. Import the sql file in MYSQL using XAMPP
4. Run as java application in main springBoot file.
5. Test apis using postman.

Run Frontent React -

1. git clone havaijhaaj
2. cd  optifly
3. npm install
4. npm start




SignUp Page

![Screenshot 2024-05-25 150516](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/54094576-142d-4112-838f-a78332a13ea6)


Maps

Optimal Path - shortest path

![Optimal Path](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/c61c50d6-4360-4a18-be19-6a60b85072c7)


Optimal Waypoint Path - shortest path using waypoints

![WayPoint](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/33ea8358-71bc-4ee7-aff4-749061a05569)


Optimal Weather Waypoint Path - Moat optimal path using all weather conditions

![Weather waypoint](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/3c6a3249-4e52-48ec-b26c-ead580b6f174)


WeatherChart Data

![Screenshot 2024-05-25 150940](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/032d45a9-4d4d-4e77-9ee3-4551a41b7179)



**APIs Used:**

1.Realtime  Weather API

 ![image](https://github.com/himanshuParashar0101/havaijhaaj/assets/55035733/eb79b304-845c-477f-a050-5851d218ce01)


2./airbus6/calculateWeatherOptimumRoute

![image](https://github.com/himanshuParashar0101/havaijhaaj/assets/55035733/3733e957-d03b-4ec5-a161-15e32a4a7ad8)


3./airbus6/calculateOptimumRoute

![image](https://github.com/himanshuParashar0101/havaijhaaj/assets/55035733/d4fb5ba2-cc88-48b1-9115-609dd1561e23)


**4. Database: MySQL**
   
![image](https://github.com/himanshuParashar0101/havaijhaaj/assets/55035733/0581969f-36a7-40e2-bd0a-8a87989c1e4a)


**Algorithms Used**

1.Haversine Algorithm

2.Dijkstra's Algorithm

**Weather /External Factors-**

1. Weather code
2. Precipitation ( Turbulence)
3. Wind Speed ( Stability)
4. Relative Humidity ( Static electricity)
5. Temperature ( Engine Efficiency)
6. Rain
7. Snowfall
8. Cloud Cover ( Visibility )


**II. Flight Matrix Dashboard--** 

![Screenshot 2024-05-25 142707](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/3a1d5ddb-e910-440d-aee2-7c6ea088a892)

![Screenshot 2024-05-25 142723](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/bb1f9516-c103-42e8-9097-c9f5d29a28df)



**III. Flight Sustainability Dashboard--**

![Screenshot 2024-05-25 012917](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/44a2fad4-1ff0-4781-9262-9596df7cf894)

![Screenshot 2024-05-25 012944](https://github.com/himanshuParashar0101/havaijhaaj/assets/103347563/6acc3f4f-56b4-451a-be98-201cda800305)






**Tools Used--**

Backend -  Java , SpringBoot, JPA, MySQL ,REST APIs ,Junit(Unit Test Case),Eclipse,XAMPP

UI - ReactJS ,VSCode

Deployment - Netlifiy , git,github






