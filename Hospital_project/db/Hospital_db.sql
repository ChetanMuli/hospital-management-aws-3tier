-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2024 at 04:20 AM
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
-- Database: `db2`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

CREATE TABLE `about_us` (
  `about_us_id` int(11) NOT NULL,
  `heading` text DEFAULT NULL,
  `sub_heading` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `key_point_1` varchar(200) DEFAULT NULL,
  `key_point_2` varchar(200) DEFAULT NULL,
  `key_point_3` varchar(200) DEFAULT NULL,
  `key_point_4` varchar(200) DEFAULT NULL,
  `about_img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_us`
--

INSERT INTO `about_us` (`about_us_id`, `heading`, `sub_heading`, `details`, `key_point_1`, `key_point_2`, `key_point_3`, `key_point_4`, `about_img`) VALUES
(1, 'Sonwane Hospital', 'Best Doctors  In World', 'Our hospital is a 31 bedded multispecialty hospital registered under Bombay Nursing Home Registration Act, 1949, providing all health care services to the common people, industries/ corporate world.\r\n\r\nWe have well equipped 05 bedded I.C.U and we have 2 Operation Theaters. Our Radiology Department is well resourced with all modern machines and equipment’s and we provide 24x7x365 Medicare services. We have ambulance facility which is also available 24x7x365.', 'Award Winning', '24/7 Opened', 'Professional Staff', 'Fair Prices', '1709788442435doctor2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `admin_tbl`
--

CREATE TABLE `admin_tbl` (
  `id` int(11) NOT NULL,
  `admin_name` varchar(200) NOT NULL,
  `admin_email` varchar(200) NOT NULL,
  `admin_password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_tbl`
--

INSERT INTO `admin_tbl` (`id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'Avinash', 'avi5@gmail.com', '9191');

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  `user_mobile` varchar(15) DEFAULT NULL,
  `appointment_date` varchar(200) DEFAULT NULL,
  `appointment_time` varchar(200) DEFAULT NULL,
  `appointment_status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appointment_id`, `service_id`, `doctor_id`, `user_name`, `user_mobile`, `appointment_date`, `appointment_time`, `appointment_status`) VALUES
(14, 6, 3, 'Avinash Ajabe', '8080373985', '2024-04-10', '10:11', 'pending'),
(16, 8, 7, 'Pradip Gange', '919188888', '2024-05-11', '10:01', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `basic_info`
--

CREATE TABLE `basic_info` (
  `basic_info_id` int(11) NOT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `email_id` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `twitter_link` text DEFAULT NULL,
  `facebook_link` text DEFAULT NULL,
  `linkedin_link` text DEFAULT NULL,
  `instagram_link` text DEFAULT NULL,
  `google_map_link` text DEFAULT NULL,
  `heading` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basic_info`
--

INSERT INTO `basic_info` (`basic_info_id`, `mobile_no`, `email_id`, `address`, `twitter_link`, `facebook_link`, `linkedin_link`, `instagram_link`, `google_map_link`, `heading`) VALUES
(1, '918080373985', 'avinash5@gmail.com', 'ASHTI TAL ASHTI DIST BEED', 'https://twitter.com', 'https://facebook.com', 'https://linkedin.com', 'https://instagram.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60220.857132446654!2d74.99625414704548!3d19.377656215164993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb6118a118def1%3A0x1781f16836921ed3!2sDedgaon%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704259635900!5m2!1sen!2sin', ' 9 Am / 7 Pm Opening ');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  `user_email` varchar(200) DEFAULT NULL,
  `user_mobile` varchar(15) DEFAULT NULL,
  `user_message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`user_id`, `user_name`, `user_email`, `user_mobile`, `user_message`) VALUES
(3, 'Avinash Ashok Ajabe', 'avi5@gmail.com', '8080373985', 'best');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` int(11) NOT NULL,
  `doctor_name` varchar(200) DEFAULT NULL,
  `doctor_mobile` varchar(10) DEFAULT NULL,
  `doctor_email` varchar(200) DEFAULT NULL,
  `speciallist` varchar(200) DEFAULT NULL,
  `doctor_service_id` int(11) DEFAULT NULL,
  `twitter_link` text DEFAULT NULL,
  `facebook_link` text DEFAULT NULL,
  `linkedin_link` text DEFAULT NULL,
  `instagram_link` text DEFAULT NULL,
  `doctore_image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `doctor_name`, `doctor_mobile`, `doctor_email`, `speciallist`, `doctor_service_id`, `twitter_link`, `facebook_link`, `linkedin_link`, `instagram_link`, `doctore_image`) VALUES
(3, 'Dr.  Sujay Sonvane', '1234567890', 'sujaysonvane@gmail.com', 'Implant Surgeon', 6, 'https://twitter.com', 'https://facebook.com', 'https://linkedin.com', 'https://instagram.com', '1709788442435sujay.dada.jpg'),
(4, 'Dr. John Doe', '1234567890', 'john@gmail.com', 'Implant Surgeon', 6, 'https://twitter.com', 'https://facebook.com', 'https://linkedin.com', 'https://instagram.com', '1709822234622doctor4.jpg'),
(5, 'Dr. John Doe', '1234567890', 'john@gmail.com', 'Implant Surgeon', 6, 'https://twitter.com', 'https://facebook.com', 'https://linkedin.com', 'https://instagram.com', '1709788442435doctor.7.jpg'),
(6, 'Dr. John Doe', '1234567890', 'john@gmail.com', 'Neurologist', 6, 'https://twitter.com', 'https://facebook.com', 'https://linkedin.com', 'https://instagram.com', '1709788442435doctor.5.jpg'),
(7, 'Dr. Vinod  Pokale ', '1234567890', 'vinodpokale@gmail.com', 'Surgery ', 8, 'https://twitter.com', 'https://facebook.com', 'https://linkedin.com', 'https://instagram.com', '1709788442435doctor.6.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `offer_id` int(11) NOT NULL,
  `offer_heading` text DEFAULT NULL,
  `offer_sub_heading` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`offer_id`, `offer_heading`, `offer_sub_heading`) VALUES
(1, 'Save 30% On Your First  Surgery ', 'Surgery is a medical procedure in which doctors make a cut in your body to treat a disease, injury, or other health problem. Some examples of surgery are taking out a tumor, opening a blockage in your intestine, or attaching a blood vessel in a new place to help blood flow to part of your body.');

-- --------------------------------------------------------

--
-- Table structure for table `opening_hours`
--

CREATE TABLE `opening_hours` (
  `opening_hours_id` int(11) NOT NULL,
  `day` text DEFAULT NULL,
  `open_time` varchar(100) DEFAULT NULL,
  `close_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `opening_hours`
--

INSERT INTO `opening_hours` (`opening_hours_id`, `day`, `open_time`, `close_time`) VALUES
(1, 'Monday  / Friday ', '09:00', '20:00'),
(28, 'Saturday ', '09:00', '14:00'),
(29, 'Sunday ', '08:30', '14:00');

-- --------------------------------------------------------

--
-- Table structure for table `pricings`
--

CREATE TABLE `pricings` (
  `offer_id` int(11) NOT NULL,
  `pricing_heading` text DEFAULT NULL,
  `pricing_sub_heading` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pricings`
--

INSERT INTO `pricings` (`offer_id`, `pricing_heading`, `pricing_sub_heading`) VALUES
(1, 'We Offer Fair Prices for Physiotherapy Treatment', 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo eirmod magna dolore erat amet');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service__id` int(11) NOT NULL,
  `services_name` text DEFAULT NULL,
  `service_images` text DEFAULT NULL,
  `service_price` varchar(20) NOT NULL,
  `key_point_1` varchar(200) NOT NULL,
  `key_point_2` varchar(200) NOT NULL,
  `key_point_3` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service__id`, `services_name`, `service_images`, `service_price`, `key_point_1`, `key_point_2`, `key_point_3`) VALUES
(6, 'Pathology ', '1709788442435Pathology .jpg', '1000', 'Modern Equipment', 'Professional Dentist', '24/7 Call Support'),
(7, 'neuro Suergery', '1709788442435neuro Suergery.jpg', '30000', 'Award Winning', '24/7 Opened', 'Professional Staff'),
(8, 'radiology ', '1709788442435radiology.jpg', '1200', 'Award Winning', '24/7 Opened', 'Professional Staff'),
(9, 'Medicine ', '1709788442435medicine.jpg', '5000', 'Award Winning', '24/7 Opened', 'Professional Staff'),
(11, 'Orthopedic', '1709788442435Orthopedic.jpg', '70000', 'Award Winning', '24/7 Opened', 'Professional Staff'),
(12, 'Surgery ', '1709788442435surgery.jpg', '40000', 'Award Winning', '24/7 Opened', 'Professional Staff');

-- --------------------------------------------------------

--
-- Table structure for table `services_heading`
--

CREATE TABLE `services_heading` (
  `service_heading_id` int(11) NOT NULL,
  `services_heading` text DEFAULT NULL,
  `before_img` text DEFAULT NULL,
  `after_img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services_heading`
--

INSERT INTO `services_heading` (`service_heading_id`, `services_heading`, `before_img`, `after_img`) VALUES
(10, 'We Offer The Best Quality Dental Services', '1709788442435before.jpg', '1709794218733after.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `slider_id` int(11) NOT NULL,
  `slider_image` text DEFAULT NULL,
  `slider_short_title` text DEFAULT NULL,
  `slider_title` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`slider_id`, `slider_image`, `slider_short_title`, `slider_title`) VALUES
(3, '1709788442435slides-1.jpg', 'Prioritize sleep to allow the body to rest and repair itself.', 'Take The Best Quality Cognitive behavioral therapy. .'),
(4, '1709788442435slides-2.jpg', 'KEEP YOUR eyes HEALTHY', 'Take The Best Quality Dialectical behavior therapy. ..'),
(5, '1709788442435slides-3.jpg', 'Valve Replacement or Repair', 'Take The Best Quality Cognitive behavioral therapy. .');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_us`
--
ALTER TABLE `about_us`
  ADD PRIMARY KEY (`about_us_id`);

--
-- Indexes for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indexes for table `basic_info`
--
ALTER TABLE `basic_info`
  ADD PRIMARY KEY (`basic_info_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`offer_id`);

--
-- Indexes for table `opening_hours`
--
ALTER TABLE `opening_hours`
  ADD PRIMARY KEY (`opening_hours_id`);

--
-- Indexes for table `pricings`
--
ALTER TABLE `pricings`
  ADD PRIMARY KEY (`offer_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service__id`);

--
-- Indexes for table `services_heading`
--
ALTER TABLE `services_heading`
  ADD PRIMARY KEY (`service_heading_id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`slider_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_us`
--
ALTER TABLE `about_us`
  MODIFY `about_us_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `basic_info`
--
ALTER TABLE `basic_info`
  MODIFY `basic_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `opening_hours`
--
ALTER TABLE `opening_hours`
  MODIFY `opening_hours_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `pricings`
--
ALTER TABLE `pricings`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service__id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `services_heading`
--
ALTER TABLE `services_heading`
  MODIFY `service_heading_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `slider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
