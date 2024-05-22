-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: May 22, 2024 at 07:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `airbus_aerothon6`
--

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

CREATE TABLE `airports` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `code` varchar(30) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airports`
--

INSERT INTO `airports` (`id`, `name`, `code`, `latitude`, `longitude`) VALUES
(9, 'Rajiv Gandhi International Airport , Hyderabad ', 'HYD', 17.23131752, 78.42985535),
(10, 'Chhatrapati Shivaji Maharaj International Airport , Mumbai', 'BOM', 19.090223, 72.8602338),
(11, 'Dr. Babasaheb Ambedkar International Airport, Nagpur', 'NAG', 21.0901619, 79.0522337),
(12, 'Dabolim Airport , Goa', 'GOI', 15.3803684, 73.8165411);

-- --------------------------------------------------------

--
-- Table structure for table `waypoints`
--

CREATE TABLE `waypoints` (
  `id` int(11) NOT NULL,
  `waypoint_name` varchar(200) NOT NULL,
  `airport_id` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `waypoints`
--

INSERT INTO `waypoints` (`id`, `waypoint_name`, `airport_id`, `latitude`, `longitude`) VALUES
(1, 'Khanapu', 12, 15.602445, 74.694073),
(2, 'Belagavi', 12, 16.278529, 74.430401),
(3, 'bardez', 12, 15.58221, 73.879691),
(4, 'Vikarabad', 9, 17.135645, 77.90527),
(5, 'Medak', 9, 18.115684, 78.416952),
(6, 'Zaheerabad', 9, 17.695154, 77.526563),
(7, 'Dhamangaon', 11, 20.857309, 77.960241),
(8, 'Hinganghat', 11, 20.325163, 78.757528),
(9, 'Yavatmal', 11, 20.032375, 77.834569),
(10, 'Pen', 10, 18.630664, 73.168142),
(11, 'Sunnar', 10, 19.78133, 74.139581),
(12, 'Amgeon', 10, 19.0322579, 73.509693);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `airports`
--
ALTER TABLE `airports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `waypoints`
--
ALTER TABLE `waypoints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `airport_id` (`airport_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `airports`
--
ALTER TABLE `airports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `waypoints`
--
ALTER TABLE `waypoints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `airports`
--
ALTER TABLE `airports`
  ADD CONSTRAINT `airports_ibfk_1` FOREIGN KEY (`id`) REFERENCES `waypoints` (`airport_id`);

--
-- Constraints for table `waypoints`
--
ALTER TABLE `waypoints`
  ADD CONSTRAINT `waypoints_ibfk_1` FOREIGN KEY (`airport_id`) REFERENCES `airports` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
